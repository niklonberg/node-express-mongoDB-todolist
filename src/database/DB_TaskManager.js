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
      await operation();
    } catch (error) {
      console.error("Error setting up connection: ", error);
    } finally {
      await MDBclient.close();
      console.log("Connection to TaskManager DB closed");
    }
  }

  async getTasks() {
    await this.manageDbOperation(async () => {
      const tasks = await this.tasks.find().toArray();
      return tasks;
    });
  }
}

module.exports = DB_TaskManager;
