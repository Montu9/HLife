import {
    cameraToScreenCoordinates,
    cameraToSceneCoordinates,
    scaleWithAnchorPoint,
} from "./utils/camera";
import { CAMERA_ANGLE } from "./utils/constants";

export interface CanvasState {
    shouldRender: boolean;
    pixelRatio: number;
    container: {
        width: number;
        height: number;
    };
    pointer: {
        x: number;
        y: number;
    };
    currentCell: {
        x: number;
        y: number;
    };
    camera: {
        x: number;
        y: number;
        z: number;
    };
    cell: {
        color: string;
        width: number;
    };
    grid: {
        color: string;
    };
    observers: ((value: CanvasState) => void)[];
}

export const getInitialCanvasState = (): CanvasState => {
    return {
        shouldRender: true,
        pixelRatio: window.devicePixelRatio || 1,
        container: {
            width: 0,
            height: 0,
        },
        pointer: {
            x: 0,
            y: 0,
        },
        currentCell: {
            x: 0,
            y: 0,
        },
        camera: {
            x: 0,
            y: 0,
            z: 0,
        },
        cell: {
            color: "#808080",
            width: 20,
        },
        grid: {
            color: "#2848eb",
        },
        observers: [],
    };
};

let canvasData = getInitialCanvasState();

export default class CanvasStore {
    public static get data() {
        if (!canvasData) canvasData = getInitialCanvasState();
        return canvasData;
    }

    static initialize(width: number, height: number) {
        canvasData = getInitialCanvasState();
        canvasData.container.width = width;
        canvasData.container.height = height;
        canvasData.camera.z = width / (2 * Math.tan(CAMERA_ANGLE));
    }

    public static attach(callback: (value: CanvasState) => void): void {
        const isExist = canvasData.observers.includes(callback);
        if (!isExist) {
            canvasData.observers.push(callback);
        }
    }

    public static detach(callback: (value: CanvasState) => void): void {
        const observerIndex = canvasData.observers.indexOf(callback);
        if (observerIndex === -1) {
            return;
        }
        canvasData.observers.splice(observerIndex, 1);
    }

    public static notify(): void {
        for (const observer of canvasData.observers) {
            observer(this.data);
        }
    }

    public static get scene() {
        const { x, y, z } = this.camera;
        const aspect = this.aspect;
        const angle = CAMERA_ANGLE;
        return cameraToSceneCoordinates(x, y, z, angle, aspect);
    }

    public static get screen() {
        const { x, y, z } = this.camera;
        const aspect = this.aspect;
        const angle = CAMERA_ANGLE;
        return cameraToScreenCoordinates(x, y, z, angle, aspect, this.scale.x, this.scale.y);
    }

    public static get camera() {
        return this.data.camera;
    }

    public static get scale() {
        const { width: w, height: h } = CanvasStore.scene;
        const { width: cw, height: ch } = CanvasStore.container;
        return { x: cw / w, y: ch / h };
    }

    public static get cell() {
        return this.data.cell;
    }

    public static get currentCell() {
        return this.data.currentCell;
    }

    public static get shouldRender() {
        return canvasData.shouldRender;
    }

    public static set shouldRender(value: boolean) {
        canvasData.shouldRender = value;
    }

    private static get container() {
        return canvasData.container;
    }

    private static get pointer() {
        return canvasData.pointer;
    }

    private static get aspect() {
        return canvasData.container.width / canvasData.container.height;
    }

    private static isCameraInBounds(cameraX: number, cameraY: number, cameraZ: number) {
        return true;
    }

    public static moveCamera(mx: number, my: number) {
        const scrollFactor = 1;
        const deltaX = (mx * scrollFactor) / this.scale.x,
            deltaY = (my * scrollFactor) / this.scale.y;
        const { x, y, z } = this.camera;
        console.log(deltaX);
        if (this.isCameraInBounds(x + deltaX, y + deltaY, z)) {
            this.data.camera.x -= deltaX;
            this.data.camera.y += deltaY;
            // move pointer by the same amount
            this.shouldRender = true;
        }
    }

    public static setCameraPosition(setX: number, setY: number) {
        const { x, y, z } = this.camera;
        if (this.isCameraInBounds(x + setX, y + setY, z)) {
            this.data.camera.x = setX;
            this.data.camera.y = setY;
            // move pointer by the same amount
            this.shouldRender = true;
            this.movePointer(setX, setY);
        }
    }

    public static zoomCamera(deltaX: number, deltaY: number) {
        console.log("camera", CanvasStore.camera);
        console.log("scene", CanvasStore.scene);
        console.log("screen", CanvasStore.screen);
        // Normal zoom is quite slow, we want to scale the amount quite a bit
        const zoomScaleFactor = 4;
        const deltaAmount = zoomScaleFactor * Math.max(deltaY);
        const { x: oldX, y: oldY, z: oldZ } = this.camera;
        const oldScale = { ...this.scale };

        const { width: containerWidth, height: containerHeight } = this.container;
        const { width, height } = cameraToSceneCoordinates(
            oldX,
            oldY,
            oldZ + deltaAmount,
            CAMERA_ANGLE,
            this.aspect
        );
        const { x: x0, y: y0 } = this.pointer;
        const newScaleX = containerWidth / width;
        const newScaleY = containerHeight / height;
        const { x: newX, y: newY } = scaleWithAnchorPoint(
            x0,
            y0,
            oldX,
            oldY,
            oldScale.x,
            oldScale.y,
            newScaleX,
            newScaleY
        );
        const newZ = oldZ + deltaAmount;
        if (newZ < 1) return;
        this.shouldRender = true;
        if (this.isCameraInBounds(oldX, oldY, newZ)) {
            this.data.camera = {
                x: newX,
                y: newY,
                z: newZ,
            };
        }
    }

    public static movePointer(clientX: number, clientY: number) {
        //console.log(clientX, clientY);
        const scale = this.scale;
        const { width: cellWidth } = this.cell;
        const { x: left, y: top } = this.scene;

        const pointerX = left + clientX / scale.x;
        const pointerY = top - clientY / scale.y;
        //console.log(top, clientY, scale.y, pointerY);

        this.data.pointer.x = Math.floor(pointerX);
        this.data.pointer.y = Math.floor(pointerY);
        console.log(scale.x, cellWidth);
        this.data.currentCell.x = ~~(
            (Math.sign(pointerX) * (Math.abs(pointerX) + cellWidth / 2)) /
            cellWidth
        );
        this.data.currentCell.y = ~~(
            (Math.sign(pointerY) * (Math.abs(pointerY) + cellWidth / 2)) /
            cellWidth
        );
        this.notify();
    }
}
