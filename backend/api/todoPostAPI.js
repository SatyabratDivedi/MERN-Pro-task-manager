const express = require("express");
const route2 = express();
const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const postModel = require("../models/postSchema");
var jwt = require("jsonwebtoken"); 

route2.get('/', async (req, res) => {
    return res.status(200).send('this is post api');
});

function authCheck(req, res, next) {
  const token = req.cookies.tokenn;
  if (!token) {
    return res.status(404).json({msg: "unauthorized! please login first"});
  }
  try {
    const user = jwt.verify(token, "shhh");
    req.userID = user;
    next();
  } catch (error) {
    return res.status(401).json({msg: "Token is invalid or expired"});
  }
};

module.exports = route2;
