import {
    Node,
    Parser,
    escape,
    isAbsPath,
    extname,
    dirname,
    normalizePath,
    getAbsPath,
    getCwd,
    Separator,
    IsBrowser
} from "whatstpl-toolkit";
import { Module, replaceError } from "./module";

var fs: {
    readFile(filename: string, encoding: string, cb: (err: Error, data: string) => void);
} = null;

if (!IsBrowser) {
    fs = require("fs");
}

export type Variables = { [name: string]: any };
export type Renderer = (locals?: Variables) => string;

export interface CompileOption {
    /** For fs.readFile() to decode the file contents. */
    encoding?: string;
    /** Whether the compiled function should be cached in memory. */
    cache?: boolean;
    /** Whether or not to remove the comments when ernder HTML. */
    removeComments?: boolean;
    /**
     * Used when the program is run in a browser and load remote template via 
     * Ajax.
     */
    timeout?: number;
}

export const CompileOption: CompileOption = {
    encoding: "utf8",
    cache: false,
    removeComments: false,
    timeout: 5000
}

export class Template {
    filename: string;
    options: CompileOption;
    module: Module;

    private currentLine: number = 0;
    private importedModuleCount: number = 0;
    private layouts: Array<{ filename: string, node: Node }> = [];

    static cache: { [filename: string]: Renderer } = {};

    constructor(filename?: string, encoding?: string);
    constructor(filename?: string, options?: CompileOption);
    constructor(filename = "", options: any = "utf8") {
        if (filename)
            this.filename = getAbsPath(filename);
        else
            this.filename = "undefined";

        if (typeof options == "string")
            options = { encoding: options };

        this.options = Object.assign({}, CompileOption, options);
    }

    /** Renders the given template contents. */
    async render(tpl: string, locals: Variables = {}): Promise<string> {
        let render = await this.compile(tpl);
        return render(locals);
    }

    /** Renders the given file. */
    static async renderFile(filename?: string, locals?: Variables, encoding?: string): Promise<string>;
    static async renderFile(filename?: string, locals?: Variables, options?: CompileOption): Promise<string>;
    static async renderFile(filename: string, locals: Variables = null, options = null): Promise<string> {
        let render = await this.compileFile(filename, options);
        return render(locals || {});
    }

    /** Compiles the given template contents. */
    async compile(tpl: string): Promise<Renderer> {
        // If the function is already cached, retrieve it instead.
        if (this.options.cache && Template.cache[this.filename]) {
            return Template.cache[this.filename];
        }

        let parser = new Parser(this.filename),
            node: Node = parser.parse(tpl),
            _module: Module = await this.createModule(node);

        // Wrap the function in a render function, so when it is  called, the 
        // program can catch and re-throw any errors, and only  return the 
        // `default` property (HTML) from the module.
        let render: Renderer = (locals = {}) => {
            try {
                return _module.require(this.filename, locals).default;
            } catch (err) { // replace and re-throw the error.
                throw replaceError(err, this.filename);
            }
        };

        if (this.options.cache)
            Template.cache[this.filename] = render;

        return render;
    }

    /** Compiles the given file. */
    static async compileFile(filename: string, encoding?: string): Promise<Renderer>;
    static async compileFile(filename: string, options?: CompileOption): Promise<Renderer>;
    static async compileFile(filename: string, options: any = null): Promise<Renderer> {
        filename = getAbsPath(filename);

        // If the function is already cached, retrieve it instead.
        if (options && options.cache && Template.cache[filename]) {
            return Template.cache[filename];
        }

        let tpl: Template = new this(filename, options),
            html = await tpl.loadTemplate();

        return tpl.compile(html);
    }

    /** Loads the template contents from the file. */
    protected loadTemplate(): Promise<string> {
        if (!IsBrowser) {
            return new Promise((resolve, reject) => {
                fs.readFile(this.filename, this.options.encoding, (err, data) => {
                    err ? reject(err) : resolve(data);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.timeout = this.options.timeout;
                xhr.open("GET", this.filename, true);
                xhr.onload = () => {
                    resolve(xhr.responseText);
                };
                xhr.onabort = xhr.onerror = xhr.ontimeout = () => {
                    reject(new Error("failed to load remote module."));
                };
                xhr.send();
            });
        }
    }

    /** Gets the absolute path of the filename, if it is relative.  */
    protected getAbsPath(filename: string): string {
        if (!isAbsPath(filename)) {
            let dir = this.filename && this.filename != "undefined"
                ? dirname(this.filename)
                : getCwd();

            filename = normalizePath(dir + Separator + filename);
        }

        // If the extension name is omitted, use the one of the parent file.
        if (!extname(filename)) {
            filename += extname(this.filename);
        }

        return filename;
    }

    /** Adds a line of source map to the internal `sourceMap` property.  */
    private addSourceMap(column: number, node: Node) {
        this.currentLine += 1;
        this.module.sourceMap[this.currentLine] = { column, node };
    }

    /** Pushes a line of code to the internal `code` object. */
    protected pushCode(before: string, contents: string, after: string, node: Node, lineEnding = true) {
        this.module.code += before + contents + after + (lineEnding ? "\n" : "");
        // `length` of a string starts from 0, but column number starts from 1,
        // so here it should add 1. 
        this.addSourceMap(before.length + 1, node);
    }

    /** Imports a module from the given file. */
    protected async importModule(parent: Module = null): Promise<Module> {
        if (this.options.cache && Module.cache[this.filename]) {
            return Module.cache[this.filename];
        }

        let tpl = await this.loadTemplate(),
            parser = new Parser(this.filename),
            node = parser.parse(tpl);

        return this.createModule(node, parent);
    }

    /** Creates a new module according to the given filename and node tree. */
    private async createModule(node: Node, parent: Module = null): Promise<Module> {
        let _module = new Module(this.filename);

        this.module = _module;

        await this.attachBlockContents(node);

        // If there is any layouts, push then to the very bottom of the 
        // compiled code, and in the layout module, use variable `__contents` 
        // to  attach the inner contents.
        if (this.layouts.length) {
            for (let { filename, node } of this.layouts) {
                this.importedModuleCount += 1;

                let moduleId = "__module_" + this.importedModuleCount;
                filename = filename.replace(/\\/g, "\\\\");

                // When dealing with layout, only import the `default` property,
                // and reassign the `default` in the current module.
                this.pushCode(
                    `const ${moduleId} = `,
                    `require('${filename}', __locals, this.default)`,
                    ";",
                    node
                );
                this.pushCode("this.default = ", `${moduleId}.default`, ";", node);
            }
        }

        _module.parent = parent;
        Module.cache[this.filename] = _module; // cache the module.
        Module.sourceMaps[this.filename] = _module.sourceMap; // cache the source map.

        return _module;
    }

    /** Attaches block contents to the internal `code` object. */
    private async attachBlockContents(parent: Node, indent = "") {
        let cutSpace = NaN;

        for (let node of <Node[]>parent.contents) {
            if (node.type == "text"
                || (node.type == "comment" && !this.options.removeComments)) {
                let contents = (<string>node.contents).replace(/\n/g, "\\n")
                    .replace(/'/g, "\\'");

                this.pushCode(
                    indent + "this.default += '",
                    contents,
                    "';",
                    node
                );
            } else if (node.type == "var") {
                if (node.tag == "!") { // !{statement}
                    this.pushCode(indent, <string>node.contents, ";", node);
                } else if (node.tag == "@") { // @{statement}
                    this.pushCode(
                        indent + "this.default += ",
                        <string>node.contents,
                        ";",
                        node
                    );
                } else { // #{statement}
                    this.pushCode(
                        indent + "this.default += __escape(",
                        <string>node.contents,
                        ");",
                        node
                    );
                }
            } else if (node.type == "snippet") { // <script engine="whatstpl"></script>
                // if (isNaN(cutSpace)) {
                //     let match = (<string>node.contents).match(/\S/);

                //     if (match)
                //         cutSpace = match.index;
                // }

                let contents: string = cutSpace
                    ? (<string>node.contents).substring(cutSpace)
                    : <string>node.contents;

                this.pushCode(indent.substring(4), contents, "", node, false);
            } else if (node.type == "block") {
                if (node.tag == "import") { // <import/>
                    await this.attachImport(node, indent);
                } else if (node.tag == "export") { // <export/>
                    await this.attachExport(node, indent);
                } else if (node.tag == "block") { // <block></block>
                    await this.attackBlock(node, indent);
                } else if (node.tag == "if") { // <if></if>
                    await this.attachIf(node, indent);
                } else if (node.tag == "else-if") { // <else-if></else-if>
                    await this.attachElseIf(node, indent.substring(4));
                } else if (node.tag == "else") { // <else></else>
                    await this.attachElse(node, indent.substring(4));
                } else if (node.tag == "switch") { // <switch></switch>
                    await this.attachSwitch(node, indent);
                } else if (node.tag == "case") { // <case></case>
                    await this.attachCase(node, indent);
                } else if (node.tag == "default") { // <default></default>
                    await this.attachDefault(node, indent);
                } else if (node.tag == "for") { // <for></for>
                    await this.attachFor(node, indent);
                } else if (node.tag == "while") { // <while></while>
                    await this.attachWhile(node, indent);
                } else if (node.tag == "do") { // <do></do>
                    await this.attachDoWhile(node, indent);
                } else if (node.tag == "continue" || node.tag == "break") {
                    // <continue/> and <break/>
                    this.pushCode(indent, node.tag, ";", node);
                } else if (node.tag == "layout") { // <layout></layout>
                    await this.attachLayout(node, indent);
                } else if (node.tag == "script") { // <script></script>
                    let attrs = node.attributes;
                    let shouldCompile = !attrs.engine
                        || attrs.engine.value != Parser.EngineName;

                    if (shouldCompile) { // JavaScript of the HTML.
                        let contents = "<script";

                        // attach attributes.
                        for (let name in attrs) {
                            contents += ` ${name}="${attrs[name].value}"`;
                        }

                        contents += ">\\n";
                        this.pushCode(
                            indent + "this.default += '",
                            contents,
                            "';",
                            node
                        );
                    }

                    // Attaches the contents in the <script> element.
                    await this.attachBlockContents(node, indent + "    ");

                    if (shouldCompile) {
                        this.pushCode(
                            indent + "this.default += '",
                            "</script>\\n",
                            "';",
                            node
                        );
                    }
                } else { // user-defined block tags.
                    let name = node.tag.replace(/-/g, "_"),
                        attrs = node.attributes;

                    if (attrs.await && attrs.await.value != "false")
                        name = "await " + name;

                    let contents = "call(this";

                    // User-defined block tags are treated as function, when 
                    // called, the attribute `data` will be used as arguments
                    // and passed to the function.
                    if (attrs.data && attrs.data.value)
                        contents += ", " + attrs.data.value;

                    contents += ")";

                    this.pushCode(indent + name + ".", contents, ";", node);
                }
            }
        }
    }

    /** <layout file="<filename>"/> */
    private async attachLayout(node: Node, indent = "") {
        let filename = this.getAbsPath(node.attributes.file.value),
            tpl: Template = new (<any>this.constructor)(filename, this.options);

        await tpl.importModule(this.module);

        // The layouts are not attached immediately, they will be stored in 
        // an array, when the current module is compiled, layouts will be 
        // added to the very end of the compiled code.
        this.layouts.push({ filename, node });
    }

    /** <import[ target="<block-name>"] file|from="<filename>"/> */
    private async attachImport(node: Node, indent = "") {
        let attrs = node.attributes,
            filename = this.getAbsPath(attrs.from ? attrs.from.value : attrs.file.value),
            tpl: Template = new (<any>this.constructor)(filename, this.options);

        await tpl.importModule(this.module);

        this.importedModuleCount += 1;

        let moduleId = "__module_" + this.importedModuleCount;
        filename = filename.replace(/\\/g, "\\\\");
        this.pushCode(
            `${indent}const ${moduleId} = `,
            `require('${filename}', __locals)`,
            ";",
            node
        );

        // The 'target' attribute in a <import/> elements sets which names 
        // should be imported.
        if (attrs.target && attrs.target.value) {
            let tags = attrs.target.value.replace(/-/g, "_").split(/\s*,\s*/);

            for (let tag of tags) {
                // parse as syntax.
                let pair = tag.split(/\s*as\s*/),
                    oldName = pair[0],
                    newName = pair[1] || oldName;

                this.pushCode(
                    indent,
                    `const ${newName} = ${moduleId}.${oldName}`,
                    ";",
                    node
                );
            }
        } else { // If no 'target', then import the `default` property.
            this.pushCode(indent, `this.default += ${moduleId}.default`, ";", node);
        }
    }

    /** <export target="<block-names>"/> */
    private async attachExport(node: Node, indent = "") {
        // The 'target' attribute in a <export/> elements sets which names 
        // should be exported and can be imported by other modules.
        if (node.attributes.target && node.attributes.target.value) {
            let tags = node.attributes.target.value.split(/,\s*/);

            for (let i in tags) {
                // parse `as` syntax
                let pair = tags[i].split(/\s+as\s+/),
                    oldName = pair[0].replace(/-/g, "_"),
                    newName = pair[1] ? pair[1].replace(/-/g, "_") : oldName;

                this.pushCode(indent, `this.${newName} = ${oldName}`, ";", node);
            }
        }
    }

    /** <block name="<name>"[ export][ async][ params="<params>"]></block> */
    private async attackBlock(block: Node, indent = "") {
        let attrs = block.attributes,
            name = attrs.name.value.replace(/-/g, "_"),
            contents = `function ${name}(`;

        // 'async' attribute means the function is an async function.
        if (attrs.async && attrs.async.value != "false")
            contents = `async ` + contents;

        // 'params' attribute sets function parameters.
        if (attrs.params && attrs.params.value)
            contents += attrs.params.value;

        contents += ")";

        this.pushCode(indent, contents, " {", block);

        await this.attachBlockContents(block, indent + "    ");

        this.pushCode(indent, "", "}", block);

        // The block can be exported by setting an 'export' attribute.
        if (attrs.export && attrs.export.value != "false")
            this.pushCode(indent, `this.${name} = ${name}`, ";", block);
    }

    /** <if condition="<condition>"></if> */
    private async attachIf(block: Node, indent = "") {
        this.pushCode(indent + "if (", block.attributes.condition.value, ") {", block);
        await this.attachBlockContents(block, indent + "    ");
        this.pushCode(indent, "", "}", block);
    }

    /** <else-if condition="<condition>"></else-if> */
    private async attachElseIf(block: Node, indent = "") {
        this.pushCode(indent + "} else if (", block.attributes.condition.value, ") {", block);
        await this.attachBlockContents(block, indent + "    ");
    }

    /** <else></else> */
    private async attachElse(block: Node, indent = "") {
        this.pushCode(indent + "} else {", "", "", block);
        await this.attachBlockContents(block, indent + "    ");
    }

    /** <switch target="<target>"></switch> */
    private async attachSwitch(block: Node, indent = "") {
        this.pushCode(indent + "switch (", block.attributes.target.value, ") {", block);
        await this.attachBlockContents(block, indent + "    ");
        this.pushCode(indent, "", "}", block);
    }

    /** <case data="<data>"></case> */
    private async attachCase(block: Node, indent = "") {
        this.pushCode(indent + "case ", block.attributes.data.value, ":", block);
        await this.attachBlockContents(block, indent + "    ");
        this.pushCode(indent + "    ", "break", ";", block);
    }

    /** <default></default> */
    private async attachDefault(block: Node, indent = "") {
        this.pushCode(indent + "default", "", ":", block);
        await this.attachBlockContents(block, indent + "    ");
        this.pushCode(indent + "    ", "break", ";", block);
    }

    /** <for statement="<statement>"></for> */
    private async attachFor(block: Node, indent = "") {
        this.pushCode(indent + "for (", block.attributes.statement.value, ") {", block);
        await this.attachBlockContents(block, indent + "    ");
        this.pushCode(indent, "", "}", block);
    }

    /** <while condition="<condition>"></while> */
    private async attachWhile(block: Node, indent = "") {
        this.pushCode(indent + "while (", block.attributes.condition.value, ") {", block);
        await this.attachBlockContents(block, indent + "    ");
        this.pushCode(indent, "", "}", block);
    }

    /** <do while="<condition>"></do> */
    private async attachDoWhile(block: Node, indent = "") {
        this.pushCode(indent + "do ", "", " {", block);
        await this.attachBlockContents(block, indent + "    ");
        this.pushCode(indent + "} while (", block.attributes.while.value, ");", block);
    }
}

export default Template;