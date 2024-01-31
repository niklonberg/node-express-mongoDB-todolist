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
        return this.tasks.find((task) => task._id === taskID);
    }
    getSubtasks(task) {
        return task.subtasks;
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
            ...curr.subtasks.filter((subtask) => (0, date_fns_1.isWithinInterval)(subtask.dueDate, {
                start: today,
                end: sevenDaysLater,
            })),
        ], []);
    }
    /* Edit methods */
    editTodo(todoToEdit, newTodo, todoArray = this.topLevelTodos) {
        const foundTodo = todoArray.find((currTodo) => currTodo.todoID === todoToEdit.todoID);
        if (foundTodo) {
            Object.assign(foundTodo, Object.assign(Object.assign({}, newTodo), { children: foundTodo.children }));
        }
        else {
            todoArray.forEach((childTodo) => this.editTodo(todoToEdit, newTodo, childTodo.children));
        }
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
    /* Set methods */
    setSelectedTodo(todoID) {
        console.log("todoID is: ", todoID);
        this.currSelectedTodo = this.getTodo(todoID);
        console.log("curr selected todo: ", this.currSelectedTodo);
    }
    resetSelectedTodo() {
        this.currSelectedTodo = null;
    }
    /* Add methods */
    addTodo(todo) {
        if (this.currSelectedTodo) {
            this.currSelectedTodo.children.push(todo);
        }
        else {
            this.topLevelTodos.push(todo);
        }
        console.log(this.topLevelTodos);
    }
    /* Delete methods */
    deleteTopLevelTodo(todoID) {
        this.topLevelTodos = this.topLevelTodos.filter((todo) => todo.todoID !== todoID);
    }
    deleteChildTodo(todoID) {
        const todo = this.getTodo(todoID);
        console.log("todo to delete: ", todo);
        this.parentTodo.children = this.parentTodo.children.filter((childTodo) => childTodo !== todo);
    }
}
exports.default = TaskManagerService;
