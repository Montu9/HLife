import {
    Description,
    DescriptionAuthor,
    DescriptionComment,
    DescriptionCoordinates,
    DescriptionFactory,
    DescriptionFeatures,
    DescriptionName,
    DescriptionRule,
} from "./Description";
import RLEReader from "./RLEReader";

export default class Pattern {
    name: DescriptionName | undefined;
    author: DescriptionAuthor[] = [];
    comment: DescriptionComment[] = [];
    coordinates: DescriptionCoordinates | undefined;
    features: DescriptionFeatures | undefined;
    rule: DescriptionRule | undefined;
    board: boolean[][] = [];

    decodeDescription(file: RLEReader): void {
        for (const line of file.desc) {
            const recognizeLine: string = line.slice(0, 2);

            const description: Description | undefined = DescriptionFactory.getDescription(
                recognizeLine,
                line
            );
            description?.assignValue(this);
        }
        console.log(this);
    }

    decodePatternTags(file: RLEReader): void {
        if (!this.features?.height || !this.features?.width) return;

        const tags = file.patternTags;
        const rows: string[] = tags.split("$");

        for (const row of rows) {
            let repeat: string = "";
            let idx = 0;

            let cellularRow: boolean[] = [];
            for (const char of row) {
                if (/\d/.test(char)) {
                    repeat += char;
                } else if (char === "b") {
                    const numRepeat = parseInt(repeat) || 1;
                    repeat = "";
                    for (let i = 0; i < numRepeat; i++) {
                        cellularRow.push(false);
                    }
                } else if (char === "o") {
                    const numRepeat = parseInt(repeat) || 1;
                    repeat = "";
                    for (let i = 0; i < numRepeat; i++) {
                        cellularRow.push(true);
                    }
                }
            }
            for (let i = cellularRow.length; i < this.features.width; i++) {
                cellularRow.push(false);
            }

            this.board.push(cellularRow);
        }
        //console.log(board);
        console.table(this.board);
    }
}
