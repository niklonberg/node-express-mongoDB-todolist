const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const MDBclient = new MongoClient(uri, { monitorCommands: true });

class DB_TaskManager {}

export default DB_TaskManager;
