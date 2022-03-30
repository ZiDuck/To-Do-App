import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtTokens from '../utils/jwt-helpers';

const prisma = new PrismaClient();

class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const { email, passWord, name } = req.body;
      const hashedPassword = await bcrypt.hash(passWord, 10);
      const user = await prisma.user.create({
        data: {
          email,
          passWord: hashedPassword,
          name,
        },
      });
      res.status(200).json({ message: 'Register Successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      // Check email
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(401).json({ error: 'Email is incorrect!' });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.passWord);
      if (!validPassword) {
        return res.status(401).json({ error: 'Password is incorrect!' });
      }

      // JWT
      const tokens = jwtTokens({ id: user.id, email: user.email, name: user.name });
      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
      return res.json(tokens);
    } catch (error) {
      return res.status(401).json({ error });
    }
  }

  async refreshToken(req: Request, res: Response) {
    // get refreshToken
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) return res.status(401).json();
      const tokens = jwtTokens({ id: user.id, email: user.email, name: user.name });
      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
      return res.status(200).json({ accessToken: tokens.accessToken });
    });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.status(200).json('Loggout successfully!');
  }
}

export default new AuthController();
