const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const route = require("./api/userAPI");
var cookieParser = require("cookie-parser");
const route2 = require("./api/todoPostAPI");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

app.use((req, res, next) => {
  const allowedOrigins = ["https://pro-task-manager.vercel.app"];
  let origin = req.headers.origin;
  if (origin && origin.endsWith('/')) {
    origin = origin.slice(0, -1);
  }
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => console.log("mongoDB connected successfully"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("this is the backend main home page");
});
app.get("/api", (req, res) => {
  res.send("this is api home page");
});

app.use("/api", route);
app.use("/api", route2);
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
