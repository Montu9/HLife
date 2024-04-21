export const cameraToSceneCoordinates = (
    x: number,
    y: number,
    z: number,
    cameraAngle: number,
    screenAspect: number
) => {
    const width = 2 * z * Math.tan(cameraAngle);
    const height = width / screenAspect;
    const screenX = x - width / 2;
    const screenY = y + height / 2;
    return { x: screenX, y: screenY, width, height };
};
export const cameraToScreenCoordinates = (
    x: number,
    y: number,
    z: number,
    cameraAngle: number,
    screenAspect: number,
    scaleX: number,
    scaleY: number
) => {
    const scene = cameraToSceneCoordinates(x, y, z, cameraAngle, screenAspect);
    const x0 = (scaleX * scene.width) / 2 + scaleX * x * -1;
    const y0 = (scaleY * scene.height) / 2 + scaleY * y;
    return { x0: x0, y0: y0 };
};
// After changing scale, we return an x y position so that the relative position from top left remains constant
// This way, after zooming, we make sure to set x and y so that users pointer position remains unchanged
export const scaleWithAnchorPoint = (
    anchorPointX: number,
    anchorPointY: number,
    cameraX1: number,
    cameraY1: number,
    scaleX1: number,
    scaleY1: number,
    scaleX2: number,
    scaleY2: number
) => {
    console.log(cameraX1, anchorPointX);

    const cameraX2 = (anchorPointX * (scaleX2 - scaleX1) + scaleX1 * cameraX1) / scaleX2;
    const cameraY2 = (anchorPointY * (scaleY2 - scaleY1) + scaleY1 * cameraY1) / scaleY2;

    return { x: cameraX2, y: cameraY2 };
};
