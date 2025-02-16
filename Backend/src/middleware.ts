import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            res.status(403).json({ message: 'Authorization header missing' });
            return;
        }
        
        const token = header.split(" ")[1]; 
        console.log(header);
        console.log(token);
        if (!token) {
            res.status(403).json({ message: "Token missing" });
            return;
        }

        // const decoded = jwt.verify(header as string, JWT_SECRET as string) as { id: string };
        const decoded = jwt.verify(token as string, JWT_SECRET as string) as { id: string };

        if (!decoded) {
            res.status(403).json({ message: 'You are not logged in' });
            return;
        }

        req.userId = decoded.id;

        next();

    } catch (error) {
        if (error instanceof Error) {
            console.error("JWT verification error:", error.message);

        } else {
            console.error("JWT verification error:", error);
        }

        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
}