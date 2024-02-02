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

// GET ALL
tasksRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks = (await collections.tasks?.find({}).toArray()) as Task[];

    res.status(200).send(tasks);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// GET ONE BY ID
tasksRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params.id;

  try {
    const query = { _id: new ObjectId(id) };
    const task = (await collections.tasks?.findOne(query)) as Task;

    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
tasksRouter.post("/", async (req: Request, res: Response) => {
  console.log("Received POST request to /tasks:", req.body);
  try {
    const currentHighestSortOrderDoc = (await collections.tasks?.findOne(
      {},
      { sort: { sortOrder: -1 } }
    )) as Task;
    console.log("current highest sort order doc: ", currentHighestSortOrderDoc);
    const newTask = req.body as Task;
    newTask.sortOrder = currentHighestSortOrderDoc.sortOrder! + 1;
    const result = await collections.tasks?.insertOne(newTask);
    result
      ? res
          .status(201)
          .send(`Successfully created a new task with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new task.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT

// DELETE
