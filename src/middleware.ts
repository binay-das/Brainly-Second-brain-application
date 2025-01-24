import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers['authorization'];
    const decoded = jwt.verify(header as string, JWT_SECRET as string);

    if (!decoded) {
        res.status(403).json({ message: 'You are not logged in' });
        return;
    }

    // @ts-ignore
    req.userId = decoded.id;
    next();
}