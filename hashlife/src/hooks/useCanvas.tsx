import { useEffect, useRef } from "react";
import { CanvasConfig, IBoard } from "../components/canvas/CanvasConfig";
import CanvasStore from "../components/canvas/CanvasState";
import GridCConfig from "../components/canvas/GridCConfig";
import useRenderLoop from "../components/canvas/RenderLoop";

interface UseCanvasProps {
    //draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
    config: GridCConfig;
}

const useCanvas = (props: UseCanvasProps) => {
    const { config } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    //useRenderLoop(60);

    console.log("canvas use canvas");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const board: IBoard = { canvas, context };

        config.init(board);
        config.preDraw(board);

        console.log("canvas useeffect");

        // Render loop
        let frameCount: number = 0;
        let animationFrameId: number;

        const render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            frameCount++;
            config.draw(board);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        config.postDraw(board);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    });

    return canvasRef;
};

export default useCanvas;
