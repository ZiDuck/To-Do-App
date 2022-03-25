import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const prisma = new PrismaClient();

async function deleteCollection(collectionId: number, req: Request, res: Response) {
  try {
    // delete task before delete collection
    const deletedTask = await prisma.task.deleteMany({
      where: {
        collectionId,
      },
    });

    const deletedCollection = await prisma.collection.delete({
      where: {
        id: collectionId,
      },
    });

    res.status(200).json({
      message: 'Delete Successfully',
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default deleteCollection;
