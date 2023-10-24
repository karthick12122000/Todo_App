const express = require("express");
var app = express();
var port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo-app");
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
// Define your ToDo model schema
const todoSchema = new mongoose.Schema({
  task: String,
  done: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);
app.get("/todos", async (req, res) => {
  var Todos = await Todo.find();

  res.send(Todos);
});
app.listen(port, () => {
  console.log("Server Started at " + port);
});
