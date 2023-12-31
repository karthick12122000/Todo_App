const express = require("express");
var app = express();
require("dotenv").config();

var port = process.env.PORT || 3000;

const cors = require("cors");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.json());

const mongoose = require("mongoose");
const uri = process.env.MONGODB_CONNECT_URI;
mongoose.connect(uri);
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

const todoSchema = new mongoose.Schema({
  task: String,
  done: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

/////////////-------------------Get
app.get("/todos", async (req, res) => {
  var Todos = await Todo.find();

  res.send(Todos);
});
//////////////////---------post
app.post("/todo", async (req, res) => {
  var newTodo = new Todo({
    task: req.body.task,
    done: false,
  });
  try {
    let resp = await newTodo.save();
    res.send(resp);
  } catch (err) {
    res.send("error:" + err);
  }
});
app.listen(port, () => {
  console.log("Server Started at " + port);
});
///////////////----------update
app.put("/todo/:id", async (req, res) => {
  taskId = req.params.id;
  flag = req.body.done;
  let resp = await Todo.updateOne({ _id: taskId }, { done: flag });
  res.send(resp);
});
///////////////----------Delete
app.delete("/todos", async (req, res) => {
  let resp = await Todo.deleteMany({ done: true });
  res.send(resp);
});
///////////////----------Delete One
app.delete("/todo/:id", async (req, res) => {
  let resp = await Todo.deleteOne({ _id: req.params.id });
  res.send(resp);
});
