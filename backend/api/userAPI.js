const express = require("express");
const route = express();
const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const postModel = require("../models/postSchema");
const assignUserModel = require("../models/assignUserSchema");
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
    return res.status(409).json({msg: "user email already exist"});
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    const username = name + Math.floor(Math.random() * 1000).toString();
    await userModel({name, username, email, password: hash}).save();
    console.log("new user save huaa");
    return res.status(200).json({msg: "user account created"});
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
      var token = jwt.sign({user: isExist}, "shhh");
      console.log(token);
      res.cookie("user_token", token).status(202).json({msg: "login successfully", user: isExist});
    } else {
      console.log("password galat hai bhai");
      return res.status(404).json({msg: "invlaid access"});
    }
  });
});

route.post("/addAssignUser", authCheck, async (req, res) => {
  const {email} = req.body;
  try {
    const whoAssign = await userModel.findById(req.user.user._id);
    const alreadyAssign = whoAssign.assignedUsers.includes(email);
    if (email == whoAssign.email) {
      return res.status(409).json({msg: "you can't assign yourself"});
    }
    if (alreadyAssign) {
      console.log("user already assign hai");
      return res.status(409).json({msg: "this user has already assign by you"});
    }
    await assignUserModel({email}).save();

    await userModel.findByIdAndUpdate(whoAssign._id, {$push: {assignedUsers: email}}, {new: true});
    console.log("new user assign huaa");
    return res.status(200).json({msg: "assign user created successfully"});
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({msg: "An error occurred"});
  }
});
route.get("/getLoginUserDetails", authCheck, async (req, res) => {
  const findLoginUser = await userModel.findById(req.user.user._id);
  return res.status(200).json({user: findLoginUser});
});

route.get("/logout", authCheck, (req, res) => {
  try {
    if (req.user) {
      console.log("logout huaa");
      return res.cookie("user_token", "").status(200).json({msg: "logout successfully"});
    }
  } catch (error) {
    return res.status(404).json({msg: "unauthorized! can't access without login"});
  }
});

function authCheck(req, res, next) {
  const token = req.cookies.user_token;
  if (!token) {
    return res.status(401).json({msg: "unauthorized! please login first"});
  }
  try {
    const user = jwt.verify(token, "shhh");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({msg: "Token is invalid or expired"});
  }
}

module.exports = route;
