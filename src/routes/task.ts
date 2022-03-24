import express, { Request, Response } from 'express';
import TaskController from './../controllers/TaskController';
import verifyTokenMiddleware from "./../middleware/middleware";

const route = express.Router();

// [GET] tasks/
route.get("/", verifyTokenMiddleware.verifyToken, TaskController.showAll);

// [POST] tasks/store
route.post("/store", verifyTokenMiddleware.verifyToken, TaskController.store);

// [DELETE] tasks/:id
route.delete("/:id", verifyTokenMiddleware.verifyToken, TaskController.delete);

export default route;