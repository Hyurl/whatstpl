import { Node } from "whatstpl-toolkit";
import { Module } from "./module";
export declare type Variables = {
    [name: string]: any;
};
export declare type Renderer = (locals?: Variables) => string;
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
export declare const CompileOption: CompileOption;
export declare class Template {
    filename: string;
    options: CompileOption;
    module: Module;
    private currentLine;
    private importedModuleCount;
    private layouts;
    static cache: {
        [filename: string]: Renderer;
    };
    constructor(filename?: string, encoding?: string);
    constructor(filename?: string, options?: CompileOption);
    /** Renders the given template contents. */
    render(tpl: string, locals?: Variables): Promise<string>;
    /** Renders the given file. */
    static renderFile(filename?: string, locals?: Variables, encoding?: string): Promise<string>;
    static renderFile(filename?: string, locals?: Variables, options?: CompileOption): Promise<string>;
    /** Compiles the given template contents. */
    compile(tpl: string): Promise<Renderer>;
    /** Compiles the given file. */
    static compileFile(filename: string, encoding?: string): Promise<Renderer>;
    static compileFile(filename: string, options?: CompileOption): Promise<Renderer>;
    /** Loads the template contents from the file. */
    protected loadTemplate(): Promise<string>;
    /** Gets the absolute path of the filename, if it is relative.  */
    protected getAbsPath(filename: string): string;
    /** Adds a line of source map to the internal `sourceMap` property.  */
    private addSourceMap(column, node);
    /** Pushes a line of code to the internal `code` object. */
    protected pushCode(before: string, contents: string, after: string, node: Node, lineEnding?: boolean): void;
    /** Imports a module from the given file. */
    protected importModule(parent?: Module): Promise<Module>;
    /** Creates a new module according to the given filename and node tree. */
    private createModule(node, parent?);
    /** Attaches block contents to the internal `code` object. */
    private attachBlockContents(parent, indent?);
    /** <layout file="<filename>"/> */
    private attachLayout(node, indent?);
    /** <import[ target="<block-name>"] file|from="<filename>"/> */
    private attachImport(node, indent?);
    /** <export target="<block-names>"/> */
    private attachExport(node, indent?);
    /** <block name="<name>"[ export][ async][ params="<params>"]></block> */
    private attackBlock(block, indent?);
    /** <if condition="<condition>"></if> */
    private attachIf(block, indent?);
    /** <else-if condition="<condition>"></else-if> */
    private attachElseIf(block, indent?);
    /** <else></else> */
    private attachElse(block, indent?);
    /** <switch target="<target>"></switch> */
    private attachSwitch(block, indent?);
    /** <case data="<data>"></case> */
    private attachCase(block, indent?);
    /** <default></default> */
    private attachDefault(block, indent?);
    /** <for statement="<statement>"></for> */
    private attachFor(block, indent?);
    /** <while condition="<condition>"></while> */
    private attachWhile(block, indent?);
    /** <do while="<condition>"></do> */
    private attachDoWhile(block, indent?);
}
export default Template;
