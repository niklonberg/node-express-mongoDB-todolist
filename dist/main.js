"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const cors = require("cors");
// app.use(cors());
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_TaskManager_1 = __importDefault(require("./database/DB_TaskManager"));
const Service_TaskManager_1 = __importDefault(require("./service/Service_TaskManager"));
const TaskManagerDB = new DB_TaskManager_1.default();
const TaskManagerService = new Service_TaskManager_1.default(TaskManagerDB);
/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv_1.default.config();
/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app = (0, express_1.default)();
const port = process.env.PORT;
const allowedOrigin = process.env.ALLOWED_ORIGIN;
const dbString = process.env.DB_CONN_STRING;
console.log("db string: ", dbString);
/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
/* Define a route for the path ("/tasks")
 using the HTTP GET method */
app.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.origin === allowedOrigin || !req.headers.origin) {
            res.header("Access-Control-Allow-Origin", allowedOrigin);
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        const tasks = TaskManagerService.getTasks();
        console.log("express task log: ", tasks);
        res.json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/createtask", (req, res) => {
    // this endpoint is responsible for creating new task
    // when todoForm submits it submits here
    // i need some way to track whether it is toplevel or subtask
    // this would use the TaskManagerService class here to do relevant things
});
