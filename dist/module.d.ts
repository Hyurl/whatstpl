import { Node } from "whatstpl-toolkit";
export interface SourceMap {
    [line: string]: {
        column: number;
        node: Node;
    };
}
export declare class Module {
    id: string;
    filename: string;
    dirname: string;
    code: string;
    parent: Module;
    children: {
        [filename: string]: Module;
    };
    sourceMap: SourceMap;
    static cache: {
        [filename: string]: Module;
    };
    static sourceMaps: {
        [filename: string]: SourceMap;
    };
    constructor(filename: string);
    /**
     *
     * @param id Module id, usually it's the module filename.
     * @param locals Local variables passed to the module.
     * @param contents Layout contents, used when the current module is a
     *  layout module.
     */
    require(id: string, locals?: {
        [name: string]: any;
    }, contents?: string): {
        [name: string]: any;
        default?: string;
    };
}
/**
 * Replaces error stack according to the source map.
 * @param filename The main module filename.
 */
export declare function replaceError(err: Error, filename: string): Error;
