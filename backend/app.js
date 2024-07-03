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


app.use(cors({
  origin: "https://pro-task-manager.vercel.app",
  credentials: true 
}));

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
