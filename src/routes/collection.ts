import express, { Request, Response } from 'express';
import CollectionController from './../controllers/CollectionController';
import verifyTokenMiddleware from "./../middleware/middleware";

const route = express.Router();

// [GET] collections/
route.get("/", verifyTokenMiddleware.verifyToken, CollectionController.showAll);

// [POST] collections/store
route.post("/store", verifyTokenMiddleware.verifyToken, CollectionController.store);

// [DELETE] collections/:id
route.delete("/:id", verifyTokenMiddleware.verifyToken, CollectionController.delete);

export default route;