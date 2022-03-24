import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwtTokens from "../utils/jwt-helpers";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

class AuthController {
    async registerUser(req: Request, res: Response) {
        try {
            const { email, passWord, name } = req.body;
            const hashedPassword = await bcrypt.hash(passWord, 10);
            const user = await prisma.user.create({
                data: {
                    email: email,
                    passWord: hashedPassword,
                    name: name,
                },
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            // Check email
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return res.status(401).json({ error: "Email is incorrect!" });
            }

            // Check password
            const validPassword = await bcrypt.compare(password, user.passWord);
            if (!validPassword) {
                return res.status(401).json({ error: "Password is incorrect!" });
            }

            // JWT
            let tokens = jwtTokens(user.id, user.email, user.name);
            res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        } catch (error) {
            res.status(401).json({ error: error });
        }
    }

    async refreshToken(req: Request, res: Response) {
        // get refreshToken 
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You're not authenticated");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
            if(err) return res.status(401).json()
            let tokens = jwtTokens(user.id, user.email, user.name);
            res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
            return res.status(200).json({ accessToken: tokens.accessToken });
        })
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("refreshToken");
        res.status(200).json("Loggout successfully!")
    }
}

export default new AuthController();
