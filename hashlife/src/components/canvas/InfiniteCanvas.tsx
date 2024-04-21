import React from "react";
import useCanvas from "../../hooks/useCanvas";
import GridCConfig from "./GridCConfig";

const InfiniteCanvas = React.memo(() => {
    const config = new GridCConfig();
    const canvasRef = useCanvas({ config });

    return (
        <canvas
            className="w-full h-full relative overflow-hidden overscroll-none"
            ref={canvasRef}
        />
    );
});

export default InfiniteCanvas;
