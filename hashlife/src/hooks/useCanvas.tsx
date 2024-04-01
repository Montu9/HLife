import { useEffect, useRef, useState } from "react";

interface CanvasSize {
    width: number;
    height: number;
}

const initGridDraw = (ctx, w, h, step) => {
    console.log(w, h);
    ctx.beginPath();
    for (let x = 0.5; x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    for (let y = 0.5; y <= h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.stroke();
};

const setCanvasSize = (c, width, height) => {
    let ratio = window.devicePixelRatio,
        style = c.style;

    style.width = "" + width / ratio + "px";
    style.height = "" + height / ratio + "px";

    c.width = width;
    c.height = height;
};

const useCanvas = (draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        //setCanvasSize(canvas, canvas.width, canvas.height);

        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;

        let frameCount: number = 0;
        let animationFrameId: number;

        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        };
        //render();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        initGridDraw(context, canvas.width, canvas.height, 20);

        const handleResize = () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [draw, canvasSize]);

    return canvasRef;
};

export default useCanvas;
