import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CollectionController {
    async showAll(req: Request, res: Response) {
        try {
            const collection = await prisma.collection.findMany({ 
                include: {
                    tasks: true
                }
            })
            res.status(200).json(collection);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { nameCollection, userId } = req.body;
            const collection = await prisma.collection.create({ 
                data: { 
                    nameCollection: nameCollection, 
                    userId: userId
                }
            })
            res.status(200).json(collection);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const collectionId = +req.params.id;
            // delete collection before delete user

            const deletedTask = await prisma.task.deleteMany({
                where: {
                    collectionId: collectionId,
                },
            });

            const deletedCollection = await prisma.collection.delete({
                where: {
                    id: collectionId,
                },
            });
            res.status(200).json(deletedCollection);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new CollectionController;