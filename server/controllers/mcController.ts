import { Request, Response } from "express";

const getMCPattern = async (req: Request, res: Response) => {
    return res.sendStatus(200);
};

export { getMCPattern };
