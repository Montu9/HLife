import { Request, Response } from "express";

const getPattern = async (req: Request, res: Response) => {
    return res.sendStatus(200);
};

export { getPattern };
