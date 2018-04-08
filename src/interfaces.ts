import { Node } from "whatstpl-toolkit";

export interface SourceMap {
    [line: string]: {
        column: number;
        node: Node;
    }
}