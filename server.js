var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.get("/todos", (req, res) => {
  res.send("Todo Lists");
});
app.listen(port, () => {
  console.log("Server Started at " + port);
});
