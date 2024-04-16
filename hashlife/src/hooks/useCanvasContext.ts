import { useContext } from "react";
import CanvasContext from "../context/canvasContext/canvasContext";

export const useCanvasContext = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("useCanvasContext must be used withing a CanvasContextProvider");
    }
    return context;
};
