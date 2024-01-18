const express = require("express");
const port = 3000;
const users = require("./users.json");

const app = express();
app.use(cors());

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", (req, res) => {
  res.json(users);
});
