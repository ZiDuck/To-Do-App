import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import deleteCollection from '../utils/deleteCollection';

const prisma = new PrismaClient();

class CollectionController {
  async showAll(req: Request, res: Response) {
    try {
      const collection = await prisma.collection.findMany({
        include: {
          tasks: true,
        },
      });
      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { nameCollection, userId } = req.body;
      const collection = await prisma.collection.create({
        data: {
          nameCollection,
          userId,
        },
      });
      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error });
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
      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  delete(req: Request, res: Response) {
    const collectionId = +req.params.id;
    deleteCollection(collectionId, req, res);
  }
}

export default new CollectionController();
