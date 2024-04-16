import { CanvasState } from "../CanvasState";

export interface Observer {
    update(subject: CanvasState): void;
}
