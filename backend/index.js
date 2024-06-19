const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const route = require("./api/userAPI");
var cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); 

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => console.log("mongoDB connected successfully"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("this is the main home page");
});

app.use("/api", route);
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
