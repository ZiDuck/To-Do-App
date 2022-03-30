import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CollectionController {
  async showAll(req: Request, res: Response) {
    try {
      const collections = await prisma.collection.findMany({
        include: {
          tasks: true,
        },
      });
      return res.status(200).json(collections);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req: Request, res: Response) {
    const userId = req.user.id;
    try {
      const { nameCollection } = req.body;
      const collection = await prisma.collection.create({
        data: {
          nameCollection,
          userId,
        },
      });
      return res.status(200).json(collection);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const collectionId = +req.params.id;
      const { nameCollection } = req.body;

      const collection = await prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          nameCollection,
        },
      });
      return res.status(200).json(collection);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const collectionId = +req.params.id;

      const deletedCollection = await prisma.collection.delete({
        where: {
          id: collectionId,
        },
      });

      return res.status(200).json({
        message: 'Delete Successfully',
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async getAllTasksOfCollection(req: Request, res: Response) {
    try {
      const collectionId = +req.params.id;
      const tasks = await prisma.task.findMany({
        where: {
          collectionId: collectionId,
        },
      });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async storeTaskOfCollection(req: Request, res: Response) {
    try {
      const collectionId = +req.params.id;
      const { nameTask, deadline, description } = req.body;
      const task = await prisma.task.create({
        data: {
          nameTask,
          collectionId,
          deadline,
          description,
        },
      });
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new CollectionController();
