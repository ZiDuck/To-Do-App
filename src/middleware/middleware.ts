import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
class middleware {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.token as string;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.body.user = user;
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated");
        }
    }
}

export default new middleware();
