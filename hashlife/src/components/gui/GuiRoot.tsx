import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MCPattern from "../../hashlife/MCPattern";
import CanvasStore, { CanvasState } from "../canvas/CanvasState";

const GuiRoot = () => {
    const [pixelRatio, setPixelRatio] = useState<CanvasState | null>(null);

    useEffect(() => {
        const updatePixelRatio = (value: CanvasState) => {
            setPixelRatio({ ...value });
            //console.log(CanvasStore.camera);
            //console.log(value, CanvasStore.scene, CanvasStore.screen);
        };
        CanvasStore.attach(updatePixelRatio);

        return () => CanvasStore.detach(updatePixelRatio);
    });

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
            <button onClick={handleClick}>
                Pobierz{pixelRatio?.pointer.x},{pixelRatio?.pointer.y}
            </button>
            <h1>
                {pixelRatio?.currentCell.x}, {pixelRatio?.currentCell.y}
            </h1>
        </div>
    );
};

export default GuiRoot;
