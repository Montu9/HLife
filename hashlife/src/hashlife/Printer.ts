import Node from "./Node";
import { NodeType } from "./NodeType";

export default class Printer {
    static printNode(node: Node) {
        let s = 2 ** node.depth;
        let U: number[][] = new Array(s).fill(0).map(() => new Array(s).fill(0));
        console.log(s, U);
        U = Printer.recurse(node, [0, 0], U);
        U = U.reverse();

        let strRes = "";
        for (const u of U) {
            for (const v of u) {
                v == 1 ? (strRes += "@ ") : (strRes += ". ");
            }
            strRes += "\n";
        }

        return strRes;
    }

    static recurse(node: Node, corner: number[], U: number[][]) {
        const depth = node.depth;

        if (depth === 1) {
            if (node.sw == 1) U[corner[1]][corner[0]] = 1;
            else U[corner[1]][corner[0]] = 0;

            if (node.se == 1) U[corner[1]][corner[0] + 1] = 1;
            else U[corner[1]][corner[0] + 1] = 0;

            //console.table(U);
            //console.log(corner[1], corner[0]);
            if (node.nw == 1) U[corner[1] + 1][corner[0]] = 1;
            else U[corner[1] + 1][corner[0]] = 0;

            if (node.ne == 1) U[corner[1] + 1][corner[0] + 1] = 1;
            else U[corner[1] + 1][corner[0] + 1] = 0;
        } else if (depth > 1) {
            Printer.recurse(node.sw as Node, [corner[0], corner[1]], U);
            Printer.recurse(node.se as Node, [corner[0] + 2 ** (depth - 1), corner[1]], U);
            Printer.recurse(node.nw as Node, [corner[0], corner[1] + 2 ** (depth - 1)], U);
            Printer.recurse(
                node.ne as Node,
                [corner[0] + 2 ** (depth - 1), corner[1] + 2 ** (depth - 1)],
                U
            );
        }

        return U;
    }
}
