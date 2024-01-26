const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { monitorCommands: true });

let dogs;
async function getDogs() {
  dogs = await client.db("pets").collection("dogs").find().toArray();
  console.log(dogs);
}

getDogs();
