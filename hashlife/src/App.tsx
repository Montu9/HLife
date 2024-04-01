import axios from "./api/axios";
import Canvas from "./components/canvas/Canvas";
import MCPattern from "./hashlife/MCPattern";
import Node from "./hashlife/Node";
import Printer from "./hashlife/Printer";

function App() {
    const handleClick = async () => {
        try {
            const { data } = await axios.get("/all/mc/oscillator1.mc");

            const pattern: MCPattern = new MCPattern(data);
            console.dir(pattern, { depth: 1 });
        } catch (error) {
            console.log(error);
        }
    };

    const draw = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
        ctx.fill();
    };

    return (
        <>
            <Canvas draw={draw} />
            <div className="gui-control">
                <button onClick={handleClick}>Pobierz</button>
            </div>
        </>
    );
}

export default App;
