import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskController {
  async showAll(req: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { nameTask, collectionId, deadline, description } = req.body;
      const task = await prisma.task.create({
        data: {
          nameTask,
          collectionId,
          deadline,
          description,
        },
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const taskId = +req.params.id;

      const { nameTask, deadline } = req.body;
      const task = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          nameTask,
          deadline,
        },
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const taskId = +req.params.id;
      // delete collection before delete user

      const deletedTask = await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
      res.status(200).json(deletedTask);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default new TaskController();
