import { CanvasConfig, IBoard } from "./CanvasConfig";
import CanvasStore from "./CanvasState";

export default class GridCConfig extends CanvasConfig {
    init(board: IBoard): void {
        this.resize(board);
        window.addEventListener("resize", () => this.resize(board));
    }

    preDraw(board: IBoard): void {
        const width = board.canvas.width;
        const height = board.canvas.height;
        board.context.clearRect(0, 0, width, height);

        this.grid(board);
    }

    draw(board: IBoard): void {
        this.grid(board);
    }
    postDraw(board: IBoard): void {}

    resize(board: IBoard): boolean {
        const { width, height } = board.canvas.getBoundingClientRect();

        if (board.canvas.width !== width || board.canvas.height !== height) {
            CanvasStore.initialize(width, height);
            const ratio = window.devicePixelRatio;
            board.canvas.width = width * ratio;
            board.canvas.height = height * ratio;
            board.context.scale(ratio, ratio);
            return true;
        }
        return false;
    }

    grid(board: IBoard): void {
        const scale = CanvasStore.scale;
        const { width, height } = board.canvas;
        const { x0, y0 } = CanvasStore.screen;
        const scaledCellWidth = this.cellWidth * scale.x;
        const left = (x0 - scaledCellWidth / 2) % scaledCellWidth;
        const top = (y0 - scaledCellWidth / 2) % scaledCellWidth;

        board.context.beginPath();
        for (let x = left; x <= width; x += scaledCellWidth) {
            board.context.moveTo(x, 0);
            board.context.lineTo(x, height);
        }
        board.context.strokeStyle = this.gridColor;
        board.context.lineWidth = this.gridWidth;
        board.context.stroke();

        board.context.beginPath();
        for (let y = top; y <= height; y += scaledCellWidth) {
            board.context.moveTo(0, y);
            board.context.lineTo(width, y);
        }
        board.context.strokeStyle = this.gridColor;
        board.context.lineWidth = this.gridWidth;
        board.context.stroke();

        this.printPoint(120, 120, board);
        this.OXY(board);
    }

    private OXY(board: IBoard): void {
        const { width, height } = board.canvas;

        const { x0: x, y0: y } = CanvasStore.screen;

        board.context.beginPath();
        board.context.moveTo(x, 0);
        board.context.lineTo(x, height);

        board.context.moveTo(0, y);
        board.context.lineTo(width, y);

        board.context.strokeStyle = "#000000";
        board.context.lineWidth = 3;
        board.context.stroke();
    }

    printCell(x: number, y: number, board: IBoard): void {
        const scale = CanvasStore.scale;
        const scaledCellWidth = this.cellWidth * scale.x;
        const { x0, y0 } = CanvasStore.scene;
        const cellY = y0 - y * scaledCellWidth - scaledCellWidth / 2;
        const cellX = x0 + x * scaledCellWidth - scaledCellWidth / 2;

        board.context.beginPath();
        board.context.rect(cellX, cellY, scaledCellWidth, scaledCellWidth);
        board.context.fillStyle = "blue";
        board.context.fill();
    }

    private printPoint(x: number, y: number, board: IBoard): void {
        board.context.beginPath();
        board.context.arc(x, y, 10, 0, 2 * Math.PI, true);
        board.context.fill();
    }
}
