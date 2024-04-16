import { useEffect } from "react";
import axios from "../../api/axios";
import MCPattern from "../../hashlife/MCPattern";
import CanvasStore, { CanvasState } from "../canvas/CanvasState";
import useCanvas from "../../hooks/useCanvas";
import { Observer } from "../canvas/utils/Observer";

class ConcreteObserverB implements Observer {
    public update(subject: CanvasState): void {
        console.log(subject.pointer);
    }
}

const GuiRoot = () => {
    const observer1 = new ConcreteObserverB();
    useEffect(() => {
        CanvasStore.attach(observer1);
        console.log("asd");
    });

    useEffect(() => {
        console.log(useCanvas);
    }, [useCanvas]);

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
        <div className="w-full h-full">
            <button onClick={handleClick}>Pobierz</button>
        </div>
    );
};

export default GuiRoot;
