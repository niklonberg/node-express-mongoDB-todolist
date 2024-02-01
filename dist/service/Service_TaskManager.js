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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transfers and edits tasks between endpoints and database.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class Service_TaskManager {
    // parentTodo: null | Task;
    constructor(DBTaskManagerInstance) {
        this.TaskManagerDB = DBTaskManagerInstance;
        this.tasks = [];
        this.currSelectedTask = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.tasks = yield this.TaskManagerDB.getTasks();
                this.currSelectedTask = this.tasks[0];
            }
            catch (error) {
                console.error("Error during TaskManagerService init: ", error);
            }
        });
    }
    /* Get methods */
    getTasks() {
        return this.tasks;
    }
}
exports.default = Service_TaskManager;
/*
form submit method needs to change between
post and put depending on whether an edit or new task
*/
