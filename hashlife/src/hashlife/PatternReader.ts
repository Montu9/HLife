export default interface PatternReader {
    fileName: string;
    desc: string[];
    rawPattern: string[];

    open(): Promise<string[]>;
}
