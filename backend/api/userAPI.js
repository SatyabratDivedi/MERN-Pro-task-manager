const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const postModel = require("../models/postSchema");
var jwt = require("jsonwebtoken");

route.post("/sign-up", async (req, res) => {
  const {name, email, password} = req.body;
  const isExist = await userModel.findOne({email});
  if (!name || !email || !password) {
    console.log("sare details important hai");
    return res.status(400).json({msg: "fill all the details"});
  }
  if (isExist) {
    console.log("ye user phle se hi data me hai");
    return res.status(409).json({msg: "user already exist"});
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    const username = name + Math.floor(Math.random() * 1000).toString();
    await userModel({name, username, email, password: hash}).save();
    console.log("new user save huaa");
    return res.status(200).json({msg: "new user created"});
  });
});
route.post("/sign-in", async (req, res) => {
  const {email, password} = req.body;
  const isExist = await userModel.findOne({email});
  if (!isExist) {
    console.log("this user is not avalable");
    return res.status(404).json({msg: "invlaid access"});
  }
  bcrypt.compare(password, isExist.password, (err, result) => {
    if (result) {
      console.log("user login ho gya");
      var token = jwt.sign({user: isExist._id}, "shhh");
      console.log(token);
      res.cookie("tokenn", token).status(202).json({msg: "login successfully", user: isExist});
    } else {
      console.log("password galat hai bhai");
      return res.status(404).json({msg: "invlaid access"});
    }
  });
});

route.get("/logout", (req, res) => {
  console.log("logout");
  return res.cookie("tokenn", "").status(200).json({msg: "logout successfully"});
});

function authCheck(req, res, next) {
  const token = req.cookies.tokenn;
  if (!token) {
    return res.status(404).json({msg: "unauthorized! please login first"});
  }
  const user = jwt.verify(token, "shhh");
  req.userID = user;
  next();
}
module.exports = route;
