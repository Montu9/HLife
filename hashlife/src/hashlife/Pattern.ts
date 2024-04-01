import Node from "./Node";

class Coords {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default abstract class Pattern {
    name: string | undefined;
    authors: string[] = [];
    comments: string[] = [];
    coords: Coords | undefined;
    rule: string | undefined;
    raw: string;
    desc: string[] = [];
    patternTxt: string[] = [];
    rootNode: Node | undefined;

    protected abstract split(): { desc: string[]; patternTxt: string[] };
    protected abstract decode(): Node;
    abstract toString(): string;

    constructor(raw: string) {
        this.raw = raw;
        this.split();
        this.decode();
    }
}
