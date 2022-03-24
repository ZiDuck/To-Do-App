import AuthController from "./../controllers/AuthController";
import express, { Request, Response } from "express";
import verifyTokenMiddleware from "./../middleware/middleware";
const route = express.Router();

// [POST] register
route.post('/register', AuthController.registerUser);   

// [POST] login
route.post('/login', AuthController.loginUser);   

// [POST] refresh
route.post('/refresh', AuthController.refreshToken);

// [POST] logout
route.post('/logout', verifyTokenMiddleware.verifyToken ,AuthController.logout)

export default route;