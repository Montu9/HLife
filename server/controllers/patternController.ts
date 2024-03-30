import { Request, Response } from "express";

const getMcPatterns = async (req: Request, res: Response) => {
    return res.sendStatus(200);
};

export { getMcPatterns };
