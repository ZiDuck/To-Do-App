import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import deleteCollection from '../utils/deleteCollection';

const prisma = new PrismaClient();

class UserController {
  async showAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        include: {
          collections: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async showUnique(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateNameUser(req: Request, res: Response) {
    try {
      const { userName } = req.body;
      const userId = +req.params.id;
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: userName,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updateEmail(req: Request, res: Response) {
    try {
      const { userEmail } = req.body;
      const userId = +req.params.id;
      const listUserEmail: string[] = [];
      const userEmails = await prisma.user.findMany({
        select: {
          email: true,
        },
      });

      userEmails.forEach((userEmail) => {
        listUserEmail.push(userEmail.email);
      });

      if (listUserEmail.includes(userEmail)) {
        res.status(400).json('Email must be unique');
      } else {
        const user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            email: userEmail,
          },
        });
        res.status(200).json(user);
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { userPassword } = req.body;
      const userId = +req.params.id;
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          passWord: await bcrypt.hash(userPassword, 10),
        },
      });
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = +req.params.id;

      // Get all collections of user
      const listCollections = await prisma.collection.findMany({
        where: {
          userId,
        },
      });

      const listIdCollections = listCollections.map((collection) => collection.id);

      // delete all collections of user before delete user
      listIdCollections.forEach((id) => {
        deleteCollection(id, req, res);
      });

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
