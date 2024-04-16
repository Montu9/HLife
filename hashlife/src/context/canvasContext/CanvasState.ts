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
    camera: {
        x: number;
        y: number;
        z: number;
    };
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
        camera: {
            x: 0,
            y: 0,
            z: 0,
        },
    };
};

export interface Container {
    width: number;
    height: number;
}

export interface Pointer {
    x: number;
    y: number;
}

export interface Camera {
    x: number;
    y: number;
    z: number;
}

export default class CanvasStore {
    static initialize(width: number, height: number) {
        setPixelRatio;
        canvasData.pixelRatio = window.devicePixelRatio || 1;
        canvasData.container.width = containerWidth;
        canvasData.container.height = containerHeight;
        canvasData.camera.x = 0;
        canvasData.camera.y = 0;
        canvasData.camera.z = containerWidth / (2 * Math.tan(CAMERA_ANGLE));
    }
}
