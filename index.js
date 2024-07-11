require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const user = require("./src/routes/user.route");
const common = require("./src/routes/common.route");
const waterQuality = require("./src/routes/waterQuality.route");
const crab = require("./src/routes/crab.route");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.USER_DB,
  pass: process.env.PASS_DB,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/user", user);
app.use("/common", common);
app.use("/water-quality", waterQuality);
app.use("/crab", crab);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
