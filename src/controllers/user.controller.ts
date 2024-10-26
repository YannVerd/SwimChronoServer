import { Request, Response } from "express";

export const insertUser = async (req: Request, res: Response) => {
    res.status(200).json(req.body)
}