import path from "path";
import fs from "fs";
import readline from "node:readline";

export default class RLEReader {
    fileName: string;
    patternTags: string;
    desc: string[];

    constructor(fileName: string) {
        this.fileName = fileName;
        this.desc = [];
        this.patternTags = "";
    }

    async open() {
        const filePath = path.join(__dirname, `../patterns/rle/${this.fileName}.rle`);
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            const firstChar = line.charAt(0);

            if (firstChar === "#" || firstChar === "x") {
                this.desc.push(line);
            } else if (firstChar !== "" && firstChar.trim() !== "") {
                this.patternTags += line;
            }
        }
    }
}
