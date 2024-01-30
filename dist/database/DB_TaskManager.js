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
const mongodb_1 = require("mongodb");
const uri = "mongodb://localhost:27017";
const MDBclient = new mongodb_1.MongoClient(uri, { monitorCommands: true });
class DB_TaskManager {
    constructor() {
        this.tasks = MDBclient.db("TaskManager").collection("tasks");
        // we could set up connection upon instantiation and keep it up?
    }
    // or use below function in all CRUD tasks?
    manageDbOperation(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MDBclient.connect();
                console.log("Connection to TaskManager DB opened");
                return yield operation();
            }
            catch (error) {
                console.error("Error setting up connection: ", error);
            }
            finally {
                yield MDBclient.close();
                console.log("Connection to TaskManager DB closed");
            }
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manageDbOperation(() => __awaiter(this, void 0, void 0, function* () {
                const tasks = yield this.tasks.find().toArray();
                console.log("db task log: ", tasks);
                return tasks;
            }));
        });
    }
    getTask() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manageDbOperation(() => __awaiter(this, void 0, void 0, function* () { }));
        });
    }
    getSubtask() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manageDbOperation(() => __awaiter(this, void 0, void 0, function* () { }));
        });
    }
    createTask() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manageDbOperation(() => __awaiter(this, void 0, void 0, function* () { }));
        });
    }
    updateTask() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manageDbOperation(() => __awaiter(this, void 0, void 0, function* () { }));
        });
    }
    deleteTask() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manageDbOperation(() => __awaiter(this, void 0, void 0, function* () { }));
        });
    }
}
exports.default = DB_TaskManager;
