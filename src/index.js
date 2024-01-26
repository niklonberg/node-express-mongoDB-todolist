// const cors = require("cors");
// app.use(cors());
const express = require("express");
const dotenv = require("dotenv");

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app = express();
const port = process.env.PORT;

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  // write the users that were sent from frontent to this endpoint into the database
});
