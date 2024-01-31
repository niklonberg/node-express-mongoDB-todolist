import { MongoClient, Collection } from "mongodb";
import { Task } from "../utils/interfaces";

const uri = "mongodb://localhost:27017";

class DB_TaskManager {
  private MDBclient: MongoClient;
  private tasks: Collection<Task>;

  constructor() {
    this.MDBclient = new MongoClient(uri, { monitorCommands: true });
    this.tasks = this.MDBclient.db("TaskManager").collection("tasks");

    this.connect();
  }

  private async connect() {
    try {
      await this.MDBclient.connect();
      console.log("Connection to TaskManagerDB opened");
    } catch (error) {
      console.error("Error setting up connection to TaskManagerDB: ", error);
    }
  }

  async manageDbOperation<T>(operation: () => Promise<T>) {
    try {
      console.log("Attempting DB operation");
      return await operation();
    } catch (error) {
      console.error("Error during operation: ", error);
    } finally {
      console.log("DB operation ended");
    }
  }

  async getTasks() {
    return await this.manageDbOperation(async () => {
      const tasks = await this.tasks.find().toArray();
      console.log("db task log: ", tasks);
      return tasks || [];
    });
  }

  async getTask() {
    return await this.manageDbOperation(async () => {});
  }

  async getSubtasks() {
    return await this.manageDbOperation(async () => {});
  }

  async getSubtask() {
    return await this.manageDbOperation(async () => {});
  }

  async createTask() {
    return await this.manageDbOperation(async () => {});
  }

  async createSubtask() {
    return await this.manageDbOperation(async () => {});
  }

  async updateTask() {
    return await this.manageDbOperation(async () => {});
  }

  async updateSubtask() {
    return await this.manageDbOperation(async () => {});
  }

  async deleteTask() {
    return await this.manageDbOperation(async () => {});
  }

  async deleteSubtask() {
    return await this.manageDbOperation(async () => {});
  }
}

export default DB_TaskManager;
