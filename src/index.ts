import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import route from './routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const prisma = new PrismaClient();

// route init
route(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
