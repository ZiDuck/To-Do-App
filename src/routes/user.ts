import express, { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import verifyTokenMiddleware from '../middleware/middleware';

const route = express.Router();

// [GET] users/me
route.get('/me', verifyTokenMiddleware.verifyToken, UserController.showUnique);

// [PUT] users/me
route.put('/me', verifyTokenMiddleware.verifyToken, UserController.update);

// [GET] users/me/collections/
route.get('/me/collections/', verifyTokenMiddleware.verifyToken, UserController.getAllCollectionByCurrentUser);

// [DELETE] users/me
route.delete('/me', verifyTokenMiddleware.verifyToken, UserController.delete);

export default route;
