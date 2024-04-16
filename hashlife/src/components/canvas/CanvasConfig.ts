interface IBoard {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}

interface ICell {
    cellColor: string;
    cellWidth: number;
}

interface IGrid {
    gridColor: string;
    gridWidth: number;
}

abstract class CanvasConfig {
    cellColor: string;
    cellWidth: number;
    gridColor: string;
    gridWidth: number;

    constructor();
    constructor(cell: ICell, grid: IGrid);
    constructor(cell?: ICell, grid?: IGrid) {
        this.cellColor = cell?.cellColor ?? "#2848eb";
        this.cellWidth = cell?.cellWidth ?? 20.0;
        this.gridColor = grid?.gridColor ?? "#808080";
        this.gridWidth = grid?.gridWidth ?? 0.5;
    }

    abstract init(board: IBoard): void;
    abstract preDraw(board: IBoard): void;
    abstract draw(board: IBoard): void;
    abstract postDraw(board: IBoard): void;
    abstract resize(board: IBoard): boolean;
}

export { CanvasConfig };

export type { IBoard, ICell, IGrid };
