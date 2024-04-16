import axios from "./api/axios";
import CanvasRoot from "./components/canvas/CanvasRoot";
import MCPattern from "./hashlife/MCPattern";

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

    return (
        <>
            <CanvasRoot />
            <div className="gui-control">
                <button onClick={handleClick}>Pobierz</button>
            </div>
        </>
    );
}

export default App;
