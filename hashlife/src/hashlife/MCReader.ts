import PatternReader from "./PatternReader";
import path from "path";
import fs from "fs";
import readline from "node:readline";

export default class MCReader implements PatternReader {
    fileSrc: string = "../patterns/mc/";
    fileName: string;
    desc: string[];
    rawPattern: string[];

    constructor(fileName: string) {
        this.fileName = fileName;
        this.desc = [];
        this.rawPattern = [];
    }

    async open(): Promise<string[]> {
        const filePath = path.join(__dirname, `${this.fileSrc}${this.fileName}.mc`);
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            if (line.length > 0) {
                const firstChar = line.charAt(0);
                if (firstChar === "#" || firstChar === "[") {
                    this.desc.push(line);
                } else {
                    this.rawPattern.push(line);
                }
            }
        }

        return [...this.desc, ...this.rawPattern];
    }
}
