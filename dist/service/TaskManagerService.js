"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_TaskManager_1 = __importDefault(require("../database/DB_TaskManager"));
/**
 * Transfers and edits tasks between endpoints and database.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class TaskManagerService {
    // parentTodo: null | Task;
    constructor() {
        this.DBTaskManager = new DB_TaskManager_1.default();
        this.tasks = []; // get tasks from db and set here.
        this.currSelectedTask = this.tasks[0];
    }
    /* Get methods */
    getTasks() {
        return this.tasks;
    }
}
exports.default = TaskManagerService;
/*
form submit method needs to change between
post and put depending on whether an edit or new task
*/
