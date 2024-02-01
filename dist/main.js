"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./service/database.service");
const tasks_router_1 = require("./routes/tasks.router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/tasks", tasks_router_1.tasksRouter);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
// app.use(cors());
// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
// import DB_TaskManager from "./database/DB_TaskManager";
// import Service_TaskManager from "./service/Service_TaskManager";
// const TaskManagerDB = new DB_TaskManager();
// const TaskManagerService = new Service_TaskManager(TaskManagerDB);
/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
// dotenv.config();
/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
// const app: Express = express();
// const port = process.env.PORT;
// const allowedOrigin = process.env.ALLOWED_ORIGIN;
// const dbString = process.env.DB_CONN_STRING;
/* Start the Express app and listen
 for incoming requests on the specified port */
// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
//   console.log("db string: ", dbString);
// });
/* Define a route for the path ("/tasks")
 using the HTTP GET method */
// app.get("/tasks", async (req: Request, res: Response) => {
//   try {
//     if (req.headers.origin === allowedOrigin || !req.headers.origin) {
//       res.header("Access-Control-Allow-Origin", allowedOrigin);
//       res.header("Access-Control-Allow-Methods", "GET");
//       res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//       );
//     }
//     const tasks = TaskManagerService.getTasks();
//     console.log("express task log: ", tasks);
//     res.json(tasks);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.post("/createtask", (req: Request, res: Response) => {
//   // this endpoint is responsible for creating new task
//   // when todoForm submits it submits here
//   // i need some way to track whether it is toplevel or subtask
//   // this would use the TaskManagerService class here to do relevant things
// });
