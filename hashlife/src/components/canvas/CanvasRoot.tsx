import React, { MouseEvent, PointerEvent, WheelEvent, useState } from "react";
import CanvasStore from "./CanvasState";
import InfiniteCanvas from "./InfiniteCanvas";
import "./canvas.css";

interface Point {
    x: number;
    y: number;
}

const CanvasRoot = React.memo(() => {
    const [isPanning, setIsPanning] = useState<boolean>(false);
    const [lastPanPosition, setLastPanPosition] = useState<Point | null>(null);

    const wheelListener = (e: WheelEvent) => {
        const friction = 1;
        const event = e as WheelEvent;
        const deltaX = event.deltaX * friction;
        const deltaY = event.deltaY * friction;
        CanvasStore.zoomCamera(deltaX, deltaY);
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        setIsPanning(true);
        setLastPanPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!isPanning || !lastPanPosition) return;

        const currentX = event.clientX;
        const currentY = event.clientY;

        // const maxDelta = 50000;
        // const deltaX =
        //     Math.abs(currentX - lastPanPosition.x) < maxDelta
        //         ? currentX - lastPanPosition.x
        //         : Math.sign(currentX - lastPanPosition.x) * maxDelta;
        // const deltaY =
        //     Math.abs(currentY - lastPanPosition.y) < maxDelta
        //         ? currentY - lastPanPosition.y
        //         : Math.sign(currentY - lastPanPosition.y) * maxDelta;

        const deltaX = currentX - lastPanPosition.x;
        const deltaY = currentY - lastPanPosition.y;
        setLastPanPosition({ x: currentX, y: currentY });
        CanvasStore.moveCamera(deltaX, deltaY);
        CanvasStore.movePointer(currentX, currentY);
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const pointerListener = (event: PointerEvent) => {
        CanvasStore.movePointer(event.clientX, event.clientY);
    };

    console.log("canvas render");

    return (
        <div
            className="w-full h-full"
            onWheel={wheelListener}
            onPointerMove={pointerListener}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
            <InfiniteCanvas />
        </div>
    );
});

export default CanvasRoot;
