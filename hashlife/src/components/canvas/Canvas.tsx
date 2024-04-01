import "./canvas.css";
import useCanvas from "../../hooks/useCanvas";

interface CanvasHookProps {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

const Canvas = (props: CanvasHookProps) => {
    const { draw, ...rest } = props;
    const canvasRef = useCanvas(draw);

    return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
