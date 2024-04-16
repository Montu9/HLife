import CanvasRoot from "./components/canvas/CanvasRoot";
import GuiRoot from "./components/gui/GuiRoot";

function App() {
    return (
        <div className="w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full">
                <CanvasRoot />
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
                <GuiRoot />
            </div>
        </div>
    );
}

export default App;
