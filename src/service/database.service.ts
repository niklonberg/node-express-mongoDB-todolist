// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Task } from "../utils/interfaces";

// Global Variables
export const collections: { tasks?: mongoDB.Collection<Task> } = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING as string
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const tasksCollection: mongoDB.Collection<Task> = db.collection(
    process.env.COLLECTION_NAME as string
  );

  collections.tasks = tasksCollection;
  console.log(`Successfully connected to database and collection`);
}
