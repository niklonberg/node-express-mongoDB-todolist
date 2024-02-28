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
exports.tasksRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../service/database.service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors = require("cors");
const allowedOrigin = process.env.ALLOWED_ORIGIN;
// Global Config
exports.tasksRouter = express_1.default.Router();
exports.tasksRouter.use(cors({
    origin: allowedOrigin,
    methods: "GET,POST,PUT,DELETE",
}));
exports.tasksRouter.use(express_1.default.json());
/**************** TASK ROUTES ****************/
// GET ALL
exports.tasksRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tasks = (yield ((_a = database_service_1.collections.tasks) === null || _a === void 0 ? void 0 : _a.find({}, { sort: { sortOrder: 1 } }).toArray()));
        res.status(200).send(tasks);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET ONE BY ID
exports.tasksRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req === null || req === void 0 ? void 0 : req.params.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const task = (yield ((_b = database_service_1.collections.tasks) === null || _b === void 0 ? void 0 : _b.findOne(query)));
        res.status(200).send(task);
    }
    catch (error) {
        console.error(error);
        res
            .status(404)
            .send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// POST
// create task
exports.tasksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    console.log("Received POST request to /tasks:", req.body);
    try {
        const currentHighestSortOrderDoc = (yield ((_c = database_service_1.collections.tasks) === null || _c === void 0 ? void 0 : _c.findOne({}, { sort: { sortOrder: -1 } })));
        const newTask = req.body;
        newTask.sortOrder = currentHighestSortOrderDoc.sortOrder + 1;
        const result = yield ((_d = database_service_1.collections.tasks) === null || _d === void 0 ? void 0 : _d.insertOne(newTask));
        result
            ? res.status(201).send(newTask)
            : res.status(500).send("Failed to create a new task.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// PUT
// edit task
exports.tasksRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const id = req === null || req === void 0 ? void 0 : req.params.id;
    console.log(`Received PUT request to /tasks/${id}`, req.body);
    try {
        const newTask = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_e = database_service_1.collections.tasks) === null || _e === void 0 ? void 0 : _e.updateOne(query, { $set: newTask }));
        if (result) {
            const updatedTask = yield ((_f = database_service_1.collections.tasks) === null || _f === void 0 ? void 0 : _f.findOne(query));
            res.status(200).send({
                message: `Successfully updated task with id ${id}`,
                updatedTask: updatedTask,
            });
        }
        else {
            res.status(304).send(`Task with id: ${id} not updated`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// DELETE
// delete task
exports.tasksRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const id = req === null || req === void 0 ? void 0 : req.params.id;
    console.log(`Received DELETE request to /tasks/${id}`, req.body);
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_g = database_service_1.collections.tasks) === null || _g === void 0 ? void 0 : _g.deleteOne(query));
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) === 1) {
            res.status(204).send();
        }
        else {
            res.status(404).send(`Task with ID ${id} not found`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}));
/**************** SUBTASK ROUTES ****************/
// PUT
// create subtask
exports.tasksRouter.put("/:id/createSubtask/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const id = req === null || req === void 0 ? void 0 : req.params.id;
    console.log(`Received PUT request to /tasks/${id}/createSubtask`, req.body);
    try {
        const newSubtask = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_h = database_service_1.collections.tasks) === null || _h === void 0 ? void 0 : _h.findOneAndUpdate(query, {
            $push: { subtasks: newSubtask },
        }, { returnDocument: "after" }));
        result
            ? res.status(200).send(result)
            : res
                .status(400)
                .send("failed to update task.subtasks with newly created subtask");
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}));
// PUT
// delete subtask
exports.tasksRouter.put("/:id/deleteSubtask/:subtaskIndex", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    const subtaskIndex = Number(req === null || req === void 0 ? void 0 : req.params.subtaskIndex);
    const id = req === null || req === void 0 ? void 0 : req.params.id;
    console.log(`Received PUT request to /tasks/${id}/deleteSubtask/${subtaskIndex}`, req.body);
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const taskToUpdate = yield ((_j = database_service_1.collections.tasks) === null || _j === void 0 ? void 0 : _j.findOne(query));
        if (taskToUpdate) {
            taskToUpdate.subtasks.splice(subtaskIndex, 1);
            const result = yield ((_k = database_service_1.collections.tasks) === null || _k === void 0 ? void 0 : _k.findOneAndUpdate(query, {
                $set: { subtasks: taskToUpdate.subtasks },
            }, { returnDocument: "after" }));
            result
                ? res.status(200).send(result)
                : res.status(404).send("Subtask deletion failed");
        }
        else {
            res.status(404).send("Task not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}));
//PUT
//toggle subtask.isCompleted
exports.tasksRouter.put(`/:id/editSubtask/:subtaskIndex`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    const subtaskIndex = Number(req === null || req === void 0 ? void 0 : req.params.subtaskIndex);
    const id = req === null || req === void 0 ? void 0 : req.params.id;
    console.log(`Received PUT request to /tasks/${id}/editSubtask/${subtaskIndex}/`, req.body);
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const taskToUpdate = yield ((_l = database_service_1.collections.tasks) === null || _l === void 0 ? void 0 : _l.findOne(query));
        if (taskToUpdate) {
            const switchIsCompletedValue = !taskToUpdate.subtasks[subtaskIndex].isCompleted;
            const result = yield ((_m = database_service_1.collections.tasks) === null || _m === void 0 ? void 0 : _m.findOneAndUpdate(query, {
                $set: {
                    [`subtasks[${subtaskIndex}].isCompleted`]: switchIsCompletedValue,
                },
            }, { returnDocument: "after" }));
        }
    }
    catch (error) { }
}));
