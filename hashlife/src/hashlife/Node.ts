import { NodeType } from "./NodeType";

export default class Node {
    sw: NodeType;
    se: NodeType;
    nw: NodeType;
    ne: NodeType;

    depth: number = 0;
    area: number = 0;

    constructor(sw: NodeType, se: NodeType, nw: NodeType, ne: NodeType) {
        this.sw = sw;
        this.se = se;
        this.nw = nw;
        this.ne = ne;

        if (this.isLeaf()) {
            this.depth = 1;
            this.area =
                (this.sw as number) +
                (this.se as number) +
                (this.nw as number) +
                (this.ne as number);
        } else {
            this.depth = (this.sw as Node).depth + 1;
            this.area =
                (this.sw as Node).area +
                (this.se as Node).area +
                (this.nw as Node).area +
                (this.ne as Node).area;
        }
    }

    isLeaf(): boolean {
        return (
            typeof this.sw === "number" &&
            typeof this.se === "number" &&
            typeof this.nw === "number" &&
            typeof this.ne === "number"
        );
    }

    static isNumeric(obj: NodeType): obj is number {
        return typeof obj === "number";
    }

    static isNode(obj: NodeType): obj is Node {
        return obj instanceof Node;
    }
}
