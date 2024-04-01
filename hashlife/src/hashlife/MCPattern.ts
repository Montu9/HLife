import Hashlife from "./Hashlife";
import Matrix from "./Matrix";
import Node from "./Node";
import Pattern from "./Pattern";

export default class MCPattern extends Pattern {
    constructor(raw: string) {
        super(raw);
    }

    protected split(): { desc: string[]; patternTxt: string[] } {
        const lines = this.raw.split(/\r\n|\n/);
        for (const line of lines) {
            if (line.length > 0) {
                const firstChar = line.charAt(0);
                if (firstChar === "#" || firstChar === "[") {
                    this.desc.push(line);
                } else {
                    this.patternTxt.push(line);
                }
            }
        }
        return { desc: this.desc, patternTxt: this.patternTxt };
    }

    protected decode(): Node {
        const nodes: Node[] = [];
        nodes.push(Hashlife.generateCanonical0(3));

        for (const line of this.patternTxt) {
            const firstChar = line.charAt(0);
            let tempNode: Node;

            if (firstChar === "." || firstChar === "*" || firstChar === "$") {
                const matrix = MCPattern.lineToMatrix(line);
                tempNode = MCPattern.matrixToNode(matrix);
            } else {
                const v: number[] = line.split(" ").map((x) => parseInt(x, 10));

                if (v[0] === 1) {
                    tempNode = Hashlife.pickCanonical(v[3], v[4], v[1], v[2]);
                } else {
                    const SW = v[3] !== 0 ? nodes[v[3]] : Hashlife.generateCanonical0(v[0] - 1);
                    const SE = v[4] !== 0 ? nodes[v[4]] : Hashlife.generateCanonical0(v[0] - 1);
                    const NW = v[1] !== 0 ? nodes[v[1]] : Hashlife.generateCanonical0(v[0] - 1);
                    const NE = v[2] !== 0 ? nodes[v[2]] : Hashlife.generateCanonical0(v[0] - 1);
                    tempNode = Hashlife.createNode(SW, SE, NW, NE);
                }
            }

            nodes.push(tempNode);
        }

        this.rootNode = nodes[nodes.length - 1];
        return nodes[nodes.length - 1];
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Converts a line of chars into matrix
     * @static
     * @param {string} line
     */
    static lineToMatrix(line: string): Matrix {
        const matrix = new Matrix(8, 8);

        const pixelLines = line.split("$");
        let j = 0;
        for (const pLine of pixelLines) {
            let i = 0;
            for (const pixel of pLine) {
                pixel === "*" ? (matrix.data[j][i] = 1) : (matrix.data[j][i] = 0);
                i++;
            }
            j++;
        }

        return matrix;
    }

    static matrixToNode(matrix: Matrix) {
        const subNodes: Node[] = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const sw = matrix.data[matrix.rows - 1 - 2 * i - 0][2 * j + 0];
                const se = matrix.data[matrix.rows - 1 - 2 * i - 0][2 * j + 1];
                const nw = matrix.data[matrix.rows - 1 - 2 * i - 1][2 * j + 0];
                const ne = matrix.data[matrix.rows - 1 - 2 * i - 1][2 * j + 1];

                subNodes.push(Hashlife.pickCanonical(sw, se, nw, ne));
            }
        }

        const SW = Hashlife.createNode(subNodes[0], subNodes[1], subNodes[4], subNodes[5]);
        const SE = Hashlife.createNode(subNodes[2], subNodes[3], subNodes[6], subNodes[7]);
        const NW = Hashlife.createNode(subNodes[8], subNodes[9], subNodes[12], subNodes[13]);
        const NE = Hashlife.createNode(subNodes[10], subNodes[11], subNodes[14], subNodes[15]);

        return Hashlife.createNode(SW, SE, NW, NE);
    }
}
