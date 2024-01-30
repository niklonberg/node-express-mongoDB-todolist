const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const MDBclient = new MongoClient(uri, { monitorCommands: true });

class DB_TaskManager {
  constructor() {
    this.tasks = MDBclient.db("TaskManager").collection("tasks");

    // we could set up connection upon instantiation and keep it up?
  }

  // or use below function in all CRUD tasks?
  async manageDbOperation(operation) {
    try {
      await MDBclient.connect();
      console.log("Connection to TaskManager DB opened");
      return await operation();
    } catch (error) {
      console.error("Error setting up connection: ", error);
    } finally {
      await MDBclient.close();
      console.log("Connection to TaskManager DB closed");
    }
  }

  async getTasks() {
    return await this.manageDbOperation(async () => {
      const tasks = await this.tasks.find().toArray();
      console.log("db task log: ", tasks);
      return tasks;
    });
  }

  async getTask() {
    return await this.manageDbOperation(async () => {});
  }

  async createTask() {
    return await this.manageDbOperation(async () => {});
  }

  async updateTask() {
    return await this.manageDbOperation(async () => {});
  }

  async deleteTask() {
    return await this.manageDbOperation(async () => {});
  }
}

module.exports = DB_TaskManager;
