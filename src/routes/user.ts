import express, { Request, Response } from "express";
import UserController from "../controllers/UserController";
import verifyTokenMiddleware from "../middleware/middleware";
const route = express.Router();


// [GET] users/
route.get("/", verifyTokenMiddleware.verifyToken, UserController.showAll);

// [GET] users/:id
route.get("/:id", verifyTokenMiddleware.verifyToken, UserController.showUnique);

// [PATCH] users/:id
route.patch("/:id/name", verifyTokenMiddleware.verifyToken, UserController.updateNameUser);
route.patch("/:id/email", verifyTokenMiddleware.verifyToken, UserController.updateEmail);
route.patch("/:id/password", verifyTokenMiddleware.verifyToken, UserController.updatePassword);


// [DELETE] users/:id
route.delete("/:id", verifyTokenMiddleware.verifyToken, UserController.delete);

export default route;
