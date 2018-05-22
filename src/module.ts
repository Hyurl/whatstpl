import {
    normalizePath,
    dirname,
    isAbsPath,
    escape,
    getObjectValues,
    getFunctionBodyOffset,
    Node
} from "whatstpl-toolkit";

export interface SourceMap {
    [line: string]: {
        column: number;
        node: Node;
    }
}

export class Module {
    id: string;
    filename: string;
    dirname: string;
    code: string;
    parent: Module;
    children: { [filename: string]: Module } = {};
    sourceMap: SourceMap = {};

    static cache: { [filename: string]: Module } = {};
    static sourceMaps: { [filename: string]: SourceMap } = {};

    constructor(filename: string) {
        this.id = this.filename = normalizePath(filename);
        this.dirname = dirname(filename);
        this.code = "";
    }

    /**
     * 
     * @param id Module id, usually it's the module filename.
     * @param locals Local variables passed to the module.
     * @param contents Layout contents, used when the current module is a 
     *  layout module.
     */
    require(id: string, locals: { [name: string]: any } = {}, contents = ""): {
        [name: string]: any;
        default?: string;
    } {
        let filename = isAbsPath(id) || this.dirname == "."
            ? id
            : normalizePath(this.dirname + "/" + id);
        let dir = dirname(filename);

        if (Module.cache[filename]) {
            let _module = Module.cache[filename],
                _exports = { default: "" },
                _require = (id: string, locals = {}, contents = "") => {
                    return _module.require(id, locals, contents);
                };

            this.children[filename] = _module;

            let fn = createFunction(this.filename, _module.code, locals);

            fn.call(
                _exports,
                _require,
                filename,
                dir,
                contents,
                locals,
                escape,
                ...getObjectValues(locals)
            );

            return _exports;
        } else {
            throw new Error("the request module hasn't been imported!");
        }
    }
}

const Params = "require, __filename, __dirname, __contents, __locals, __escape";
const EvalRE = /at ([a-zA-Z0-9_\.]+) \(eval at.+<anonymous>:(\d+:\d+)\)/;
const RequireRE = /const __module_\d+ = require\('(.+?)'/;
const FnCallRE = /([a-zA-Z0-9_]+).call\(this.*\)/;

// The `new Function()` will generate a function which it's string 
// representation is different in different JavaScript engines, so here I 
// calculate out the function body offset from a test function, so that when 
// replacing the error, the program can calculate the accurate position of the
// function body.
const FnBodyOffset = getFunctionBodyOffset(new Function("a, b", "a + b"));

function createFunction(filename: string, code: string, locals: {
    [prop: string]: any
}) {
    let props = Object.keys(locals).join(", ");

    try {
        return new Function(Params + (props ? ", " + props : ""), code);
    } catch (err) {
        if (err instanceof SyntaxError) { // replace the error stack.
            if (filename && filename !== "undefined") {
                let stacks = err.stack.split("\n");
                stacks[1] = stacks[1].replace(/<anonymous>|Function \(native\)/, filename);
                err.stack = stacks.join("\n");
            }

            throw err;
        } else {
            throw replaceError(err, filename);
        }
    }
}

/** Gets the function name from a line of code. */
function getFuncName(lineCode: string): string {
    let matches = lineCode.match(FnCallRE);
    return matches ? matches[1] : "";
}

/** Gets the imported filename from a `require()` statement. */
function getImportFilename(code: string, line: number): string {
    let codeArr = code.split("\n"),
        funcName = getFuncName(codeArr[line - 1]),
        lineCode: string, matches: RegExpMatchArray;

    if (funcName) {
        let re = new RegExp(`const ${funcName} = (__module_\\d+)\.`),
            _codeArr: string[], moduleId: string;

        for (let i in codeArr) {
            matches = codeArr[i].match(re);

            if (matches) {
                _codeArr = codeArr.slice(0, parseInt(i));
                moduleId = matches[1];

                break;
            }
        }

        if (moduleId && _codeArr && _codeArr.length) {
            _codeArr.reverse();
            let re = new RegExp(`const ${moduleId} = require\\('(.+?)'`);

            for (let code of _codeArr) {
                matches = code.match(re);

                if (matches)
                    return matches[1].replace(/\\\\/g, "\\");
            }
        } else {
            return "";
        }
    } else {
        // line number starts from 1, while array index starts from 0, so here 
        // must decrease 1.
        lineCode = codeArr[line - 1];
        matches = lineCode && lineCode.match(RequireRE);

        return matches ? matches[1].replace(/\\\\/g, "\\") : "";
    }
}

/**
 * Replaces error stack according to the source map.
 * @param filename The main module filename.
 */
export function replaceError(err: Error, filename: string): Error {
    let stacks = err.stack.split("\n").reverse();

    for (let i in stacks) {
        // first line the the stack or failed to parse the filename.
        if (stacks[i][0] != " " || !filename) continue;

        let matches = stacks[i].match(EvalRE);

        if (matches) {
            let funcName = matches[1],
                pair = matches[2].split(":"),
                line: number = parseInt(pair[0]),
                column: number = parseInt(pair[1]),
                // The running code will be wrapped in a function which the 
                // definition takes at least one line, so here the line number 
                // should decrease according to the function body offset.
                source = {
                    funcName,
                    filename,
                    line: line - FnBodyOffset.line,
                    column
                },
                /** The source map of one line of code. */
                map = Module.sourceMaps[filename][source.line],
                code = Module.cache[filename].code;

            // If the source line is 1 (the first line), then the column 
            // should be calculated as well.
            if (source.line == 1)
                source.column = column - FnBodyOffset.column;

            // recalculate the filename, move to the next import file.
            filename = getImportFilename(code, source.line);

            // Replace the line number to the line number in the source file.
            source.line = map.node.line;
            // Calculate and replace the column number.
            source.column = (column - map.column) + map.node.column;

            stacks[i] = `    at ${source.funcName} (${source.filename}`
                + `:${source.line}:${source.column})`;
        }
    }

    // Regenerate the error stack.
    stacks.reverse();
    err.stack = stacks.join("\n");

    return err;
}