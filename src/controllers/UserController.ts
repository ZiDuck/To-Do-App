import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UserController {
  async showUnique(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          collections: {
            include: {
              tasks: true,
            },
          },
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async showAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        include: {
          collections: true,
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { email, passWord, name } = req.body;
      const userId = req.user.id;
      const hashPassword = await bcrypt.hash(passWord, 10);

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
          passWord: hashPassword,
          name,
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getAllCollectionByCurrentUser(req: Request, res: Response) {
    const userId = req.user.id;
    try {
      const collections = await prisma.collection.findMany({
        where: {
          userId: userId,
        },
        include: {
          tasks: true,
        },
      });
      return res.status(200).json(collections);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user.id;

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return res.status(200).json({
        message: 'Delete Successfully',
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UserController();
