// const cors = require("cors");
// app.use(cors());
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

/* temp db class import */
import DB_TaskManager from "./database/DB_TaskManager";
const TaskManager = new DB_TaskManager();

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT;
const allowedOrigin = process.env.ALLOWED_ORIGIN;

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

/* Define a route for the path ("/tasks")
 using the HTTP GET method */
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    if (req.headers.origin === allowedOrigin || !req.headers.origin) {
      res.header("Access-Control-Allow-Origin", allowedOrigin);
      res.header("Access-Control-Allow-Methods", "GET");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }
    const tasks = await TaskManager.getTasks();
    console.log("express task log: ", tasks);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/createtask", (req: Request, res: Response) => {
  // this endpoint is responsible for creating new task
  // when todoForm submits it submits here
  // i need some way to track whether it is toplevel or subtask
  // this would use the TaskManagerService class here to do relevant things
});
