// const cors = require("cors");
// app.use(cors());
const express = require("express");
const port = 3000;
const app = express();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  // write the users that were sent from frontent to this endpoint into the database
});
