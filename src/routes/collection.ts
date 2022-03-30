import express, { Request, Response } from 'express';
import CollectionController from '../controllers/CollectionController';
import TaskController from '../controllers/TaskController';
import verifyTokenMiddleware from '../middleware/middleware';
import taskRouter from './task';
const route = express.Router();

// [GET] collections/
route.get('/', verifyTokenMiddleware.verifyToken, CollectionController.showAll);

// [POST] collections/store
route.post('/store', verifyTokenMiddleware.verifyToken, CollectionController.store);

// [PUT] collections/:id
route.put('/:id', verifyTokenMiddleware.verifyToken, CollectionController.update);

// [DELETE] collections/:id
route.delete('/:id', verifyTokenMiddleware.verifyToken, CollectionController.delete);

// [GET] collections/:id/tasks/
route.get('/:id/tasks/', verifyTokenMiddleware.verifyToken, CollectionController.getAllTasksOfCollection);

// [GET] collections/:id/tasks/store
route.post('/:id/tasks/store', verifyTokenMiddleware.verifyToken, CollectionController.storeTaskOfCollection);

export default route;
