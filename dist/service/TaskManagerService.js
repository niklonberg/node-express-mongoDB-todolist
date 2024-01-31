"use strict";
/*
form submit method needs to change between
post and put depending on whether an edit or new task
*/
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
/**
 * Transfers data between endpoints and database.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class TaskManagerService {
    // parentTodo: null | Task;
    constructor() {
        this.tasks = []; // get tasks from db and set here.
        this.currSelectedTask = this.tasks[0];
    }
    /* Get methods */
    getTasks() {
        return this.tasks;
    }
    getTask(taskID) {
        const foundTask = this.tasks.find((task) => task._id === taskID);
        return foundTask || null;
    }
    getSubtasks(taskID) {
        var _a;
        return (_a = this.getTask(taskID)) === null || _a === void 0 ? void 0 : _a.subtasks;
    }
    getSubtask() {
        // implementation here
    }
    getTodaySubtasks() {
        return this.getTasks().reduce((acc, curr) => [
            ...acc,
            ...curr.subtasks.filter((subtask) => subtask.dueDate && (0, date_fns_1.isToday)(subtask.dueDate)),
        ], []);
    }
    getNext7DaysSubtasks() {
        const today = new Date().setHours(0, 0, 0);
        const sevenDaysLater = (0, date_fns_1.addDays)(today, 7);
        return this.getTasks().reduce((acc, curr) => [
            ...acc,
            ...curr.subtasks.filter((subtask) => subtask.dueDate &&
                (0, date_fns_1.isWithinInterval)(subtask.dueDate, {
                    start: today,
                    end: sevenDaysLater,
                })),
        ], []);
    }
    /* Set methods */
    setSelectedTodo(taskID) {
        this.currSelectedTask = this.getTask(taskID);
    }
    resetSelectedTodo() {
        this.currSelectedTask = null;
    }
    /* Add methods */
    addTask(task) {
        this.tasks.push(task);
    }
    addSubtask(subtask) {
        var _a;
        (_a = this.currSelectedTask) === null || _a === void 0 ? void 0 : _a.subtasks.push(subtask);
    }
    /* Delete methods */
    deleteTask(taskID) {
        this.tasks = this.tasks.filter((task) => task._id !== taskID);
    }
    deleteSubtask(taskID) {
        const task = this.getTask(taskID);
        task.subtasks = task === null || task === void 0 ? void 0 : task.subtasks.filter((subtask) => subtask !== todo);
    }
    /* Edit methods */
    editTask(taskToEdit, newTaskProps) {
        Object.assign(taskToEdit, Object.assign({}, newTaskProps));
    }
    toggleIsCompleted(todoID) {
        const todo = this.getTodo(todoID);
        todo.isCompleted = !todo.isCompleted;
        console.log("Todo complete: ", todo.isCompleted);
        this.toggleCompletedDate(todo);
        if (this.parentTodo.children.every((childTodo) => childTodo.isCompleted)) {
            // toggle parent complete
        }
        return todo;
    }
    /* eslint-disable no-param-reassign, class-methods-use-this */
    toggleCompletedDate(todo) {
        if (!todo.dateCompleted) {
            todo.dateCompleted = new Date();
        }
        else {
            todo.dateCompleted = null;
        }
        console.log(todo.dateCompleted);
    }
    /* eslint-enable no-param-reassign */
    reorderTodo(indexToReorderTodoTo, todoItem) {
        const todoToReorder = this.getTodo(Number(todoItem.dataset.todo));
        this.topLevelTodos = this.topLevelTodos.filter((todo) => todo.todoID !== todoToReorder.todoID);
        this.topLevelTodos.splice(indexToReorderTodoTo, 0, todoToReorder);
        setTimeout(() => console.log("Toplevel Todos after: ", this.topLevelTodos), 0);
    }
}
exports.default = TaskManagerService;
