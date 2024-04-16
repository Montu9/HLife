import React, { useEffect } from "react";
import useCanvas from "../../hooks/useCanvas";
import GridCConfig from "./GridCConfig";
import useSize from "@react-hook/size";
import CanvasStore from "./CanvasState";

const InfiniteCanvas = React.memo(() => {
    const config = new GridCConfig();
    const canvasRef = useCanvas({ config });
    const [width, height] = useSize(canvasRef);

    return (
        <canvas
            className="w-full h-full relative overflow-hidden overscroll-none"
            ref={canvasRef}
        />
    );
});

export default InfiniteCanvas;
