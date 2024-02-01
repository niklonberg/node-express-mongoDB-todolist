"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskFactory {
    constructor(title, priorityLevel, dueDate, description, subtasks, sortOrder, _id) {
        this.title = title;
        this.priorityLevel = priorityLevel;
        this.dueDate = dueDate;
        this.description = description;
        this.subtasks = subtasks;
        this.sortOrder = sortOrder;
        this._id = _id;
        this.isCompleted = false;
        this.dateCompleted = null;
    }
}
exports.default = TaskFactory;
