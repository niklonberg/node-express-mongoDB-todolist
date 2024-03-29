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
class DB_TaskManager {
    constructor() {
        this.MDBclient = new mongodb_1.MongoClient(uri, { monitorCommands: true });
        this.tasks = this.MDBclient.db("TaskManager").collection("tasks");
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.MDBclient.connect();
                console.log("Connection to TaskManagerDB opened");
            }
            catch (error) {
                console.error("Error setting up connection to TaskManagerDB: ", error);
            }
        });
    }
    manageDbOperation(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Attempting DB operation");
                return yield operation();
            }
            catch (error) {
                console.error("Error during operation: ", error);
            }
            finally {
                console.log("DB operation ended");
            }
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manageDbOperation(() => __awaiter(this, void 0, void 0, function* () {
                const tasks = yield this.tasks.find().toArray();
                console.log("db task log: ", tasks);
                return tasks || [];
            }));
        });
    }
}
exports.default = DB_TaskManager;
