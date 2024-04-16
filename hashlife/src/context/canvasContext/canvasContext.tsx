import { createContext, useState } from "react";
import { Camera, Container, Pointer } from "./CanvasState";

type CanvasContextProviderProps = {
    children: React.ReactNode;
};

type CanvasContext = {
    shouldRender: boolean;
    setShouldRender: React.Dispatch<React.SetStateAction<boolean>>;
    pixelRatio: number;
    setPixelRatio: React.Dispatch<React.SetStateAction<number>>;
    pointer: Pointer;
    setPointer: React.Dispatch<React.SetStateAction<Pointer>>;
    container: Container;
    setContainer: React.Dispatch<React.SetStateAction<Container>>;
    camera: Camera;
    setCamera: React.Dispatch<React.SetStateAction<Camera>>;
};

const CanvasContext = createContext<CanvasContext | null>(null);

export const CanvasProvider = ({ children }: CanvasContextProviderProps) => {
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [pixelRatio, setPixelRatio] = useState<number>(window.devicePixelRatio || 1);
    const [container, setContainer] = useState<Container>({
        width: 0,
        height: 0,
    });
    const [pointer, setPointer] = useState<Pointer>({
        x: 0,
        y: 0,
    });
    const [camera, setCamera] = useState<Camera>({
        x: 0,
        y: 0,
        z: 0,
    });

    return (
        <CanvasContext.Provider
            value={{
                shouldRender,
                setShouldRender,
                pixelRatio,
                setPixelRatio,
                pointer,
                setPointer,
                container,
                setContainer,
                camera,
                setCamera,
            }}>
            {children}
        </CanvasContext.Provider>
    );
};

export default CanvasContext;
