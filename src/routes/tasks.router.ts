// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../service/database.service";
import TaskFactory from "../models/TaskFactory";
import { Task } from "../utils/interfaces";
import dotenv from "dotenv";
dotenv.config();
const cors = require("cors");
const allowedOrigin = process.env.ALLOWED_ORIGIN;

// Global Config
export const tasksRouter = express.Router();

tasksRouter.use(
  cors({
    origin: allowedOrigin,
    methods: "GET,POST,PUT,DELETE",
  })
);

tasksRouter.use(express.json());

// GET
tasksRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks = (await collections.tasks?.find({}).toArray()) as Task[];

    res.status(200).send(tasks);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// POST

// PUT

// DELETE
