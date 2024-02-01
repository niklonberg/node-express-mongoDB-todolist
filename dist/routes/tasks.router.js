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
// GET ALL
exports.tasksRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tasks = (yield ((_a = database_service_1.collections.tasks) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(tasks);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET BY ID
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
// PUT
// DELETE
