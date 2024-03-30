import Pattern from "./Pattern";

abstract class Description {
    private line: string | undefined;
    private cleanLine: string | undefined;

    public setLine(line: string): void {
        this.line = line;
        this.setCleanLine(line.slice(3));
    }

    public setCleanLine(cleanLine: string): void {
        this.cleanLine = cleanLine;
    }

    public getLine(): string | undefined {
        return this.line;
    }

    public getCleanLine(): string | undefined {
        return this.cleanLine;
    }

    abstract toString(): string;
    abstract assignValue(pattern: Pattern): void;
}

class DescriptionComment extends Description {
    toString(): string {
        return `Comment: ${this.getLine()}`;
    }

    assignValue(pattern: Pattern): void {
        pattern.comment.push(this);
    }
}

class DescriptionName extends Description {
    toString(): string {
        return `Name ${this.getLine()}`;
    }

    assignValue(pattern: Pattern): void {
        pattern.name = this;
    }
}

class DescriptionAuthor extends Description {
    toString(): string {
        return `Author ${this.getLine()}`;
    }

    assignValue(pattern: Pattern): void {
        pattern.author.push(this);
    }
}

class DescriptionFeatures extends Description {
    width: number | undefined;
    height: number | undefined;
    quadSize: number | undefined;
    rule: string | undefined;

    toString(): string {
        return `Features x:${this.width}, y:${this.height}, r:${this.rule}`;
    }

    decodeXY() {
        const line: string = this.getLine() || "";
        const lineParts: string[] = line.replace(/\s+/g, "").trim().split(",");
        for (const part of lineParts) {
            const value = part.split("=").at(-1);
            const label = part.split("=").at(0);
            if (value && label) {
                if (part[0] === "x") this.width = parseInt(value);
                else if (part[0] === "y") this.height = parseInt(value);
                else if (part.slice(0, 4) === "rule") this.rule = value;
            }
        }
        if (this.width && this.height) {
            let number = this.height > this.width ? this?.height : this?.width;
            this.quadSize = Math.floor(Math.log2(number)) + 1;
        }
    }

    public setLine(line: string): void {
        super.setLine(line);
        super.setCleanLine(line.replace(/\s+/g, "").trim());
        this.decodeXY();
    }

    assignValue(pattern: Pattern): void {
        pattern.features = this;
    }
}

class DescriptionRule extends Description {
    toString(): string {
        return `Rule ${this.getLine()}`;
    }

    assignValue(pattern: Pattern): void {
        pattern.rule = this;
    }
}

class DescriptionCoordinates extends Description {
    x: number | undefined;
    y: number | undefined;

    toString(): string {
        return `Coordinates ${this.getLine()}`;
    }

    decodeXY() {
        console.log(this.getLine());
    }

    assignValue(pattern: Pattern): void {
        pattern.coordinates = this;
    }
}

class DescriptionFactory {
    static descriptionMap: Map<string, Description> = new Map<string, Description>();
    static {
        this.descriptionMap.set("#C", new DescriptionComment());
        this.descriptionMap.set("#c", new DescriptionComment());
        this.descriptionMap.set("#N", new DescriptionName());
        this.descriptionMap.set("#O", new DescriptionAuthor());
        this.descriptionMap.set("#R", new DescriptionCoordinates());
        this.descriptionMap.set("#P", new DescriptionCoordinates());
        this.descriptionMap.set("#r", new DescriptionRule());
        this.descriptionMap.set("x ", new DescriptionFeatures());
    }

    static getDescription(description: string, line: string): Description | undefined {
        const value: Description | undefined = this.descriptionMap.get(description);
        value?.setLine(line);
        return value;
    }
}

export {
    Description,
    DescriptionFactory,
    DescriptionAuthor,
    DescriptionComment,
    DescriptionRule,
    DescriptionFeatures,
    DescriptionCoordinates,
    DescriptionName,
};
