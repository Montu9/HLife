import Pattern from "./Pattern";
import Node from "./Node";
import { NodeType } from "./NodeType";

export default class Hashlife {
    static CN1 = new Node(0, 0, 0, 0);
    static CN2 = new Node(0, 0, 0, 1);
    static CN3 = new Node(0, 0, 1, 0);
    static CN4 = new Node(0, 0, 1, 1);
    static CN5 = new Node(0, 1, 0, 0);
    static CN6 = new Node(0, 1, 0, 1);
    static CN7 = new Node(0, 1, 1, 0);
    static CN8 = new Node(0, 1, 1, 1);
    static CN9 = new Node(1, 0, 0, 0);
    static CN10 = new Node(1, 0, 0, 1);
    static CN11 = new Node(1, 0, 1, 0);
    static CN12 = new Node(1, 0, 1, 1);
    static CN13 = new Node(1, 1, 0, 0);
    static CN14 = new Node(1, 1, 0, 1);
    static CN15 = new Node(1, 1, 1, 0);
    static CN16 = new Node(1, 1, 1, 1);
    static CNList = [
        this.CN1,
        this.CN2,
        this.CN3,
        this.CN4,
        this.CN5,
        this.CN6,
        this.CN7,
        this.CN8,
        this.CN9,
        this.CN10,
        this.CN11,
        this.CN12,
        this.CN13,
        this.CN14,
        this.CN15,
        this.CN16,
    ];

    pattern: Pattern;

    constructor(pattern: Pattern) {
        this.pattern = pattern;
    }

    static createNode(sw: NodeType, se: NodeType, nw: NodeType, ne: NodeType) {
        if (Node.isNumeric(sw) && Node.isNumeric(se) && Node.isNumeric(nw) && Node.isNumeric(ne)) {
            return Hashlife.pickCanonical(sw, se, nw, ne);
        } else {
            return new Node(sw, se, nw, ne);
        }
    }

    static pickCanonical(sw: number, se: number, nw: number, ne: number) {
        for (const CNCandidate of Hashlife.CNList) {
            if (
                sw == CNCandidate.sw &&
                se == CNCandidate.se &&
                nw == CNCandidate.nw &&
                ne == CNCandidate.ne
            ) {
                return CNCandidate;
            }
        }
        return Hashlife.CN1;
    }

    static generateCanonical0(depth: number): Node {
        if (depth <= 0) throw new Error("Depth cannot be negative.");

        let n1 = this.CN1;
        for (let i = 2; i < depth + 1; i++) {
            n1 = Hashlife.createNode(n1, n1, n1, n1);
        }
        return n1;
    }
}
