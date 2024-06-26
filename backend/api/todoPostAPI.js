const express = require("express");
const route2 = express();
const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const postModel = require("../models/postSchema");
const assignUserModel = require("../models/assignUserSchema");
var jwt = require("jsonwebtoken");

route2.post("/createPost", authCheck, async (req, res) => {
  const {title, catogary, priority, assignTo, Checklist, date} = req.body;
  const findUser = await userModel.findOne({email: req.user.email});
  const findAssignUser = await assignUserModel.findOne({email: assignTo});

  const newPost = await new postModel({
    user: findUser._id,
    title,
    catogary,
    assignTo: findAssignUser && findAssignUser._id,
    priority,
    todosList: Checklist,
    date,
  }).save();
  findAssignUser?.posts.push(newPost._id);
  await findAssignUser?.save();
  findUser.posts.push(newPost._id);
  await findUser.save();
  const updatedUser = await userModel.findById(findUser._id).populate("posts");
  console.log("updatedUser: ", updatedUser);
  return res.status(200).json({msg: "post created successfully"});
});

route2.get("/get_all_posts", authCheck, async (req, res) => {
  const findLoginUser = await userModel.findById(req.user._id);
  const allPostsAndAssignUsres = await postModel.find({user: findLoginUser._id}).populate("assignTo");
  console.log("allPostsAndAssignUsres: ", allPostsAndAssignUsres);
  const todoPosts = allPostsAndAssignUsres.filter((post) => post.catogary == "TODO");
  console.log("todoPosts: ", todoPosts);
  const backlogPosts = allPostsAndAssignUsres.filter((post) => post.catogary == "BACKLOG");
  console.log("backlogPosts: ", backlogPosts);
  const inProcessPosts = allPostsAndAssignUsres.filter((post) => post.catogary == "PROGRESS");
  console.log("inProcessPosts: ", inProcessPosts);
  const donePosts = allPostsAndAssignUsres.filter((post) => post.catogary == "DONE");
  console.log("donePosts: ", donePosts);
  return res.status(200).json({TODO: todoPosts, BACKLOG: backlogPosts, INPROCESS: inProcessPosts, DONE: donePosts});
});

route2.put("/updatePostCatogary", authCheck, async (req, res) => {
  try {
    const {postId, catogary} = req.body;
    const findPost = await postModel.findById(postId);
    findPost.catogary = catogary;
    const updatedPost = await findPost.save();
    console.log("updatedPost: ", updatedPost);
    return res.status(200).json({msg: "post catogary updated successfully"});
  } catch (error) {
    return res.status(404).json({msg: "something went wrong"});
  }
});

function authCheck(req, res, next) {
  const token = req.cookies.user_token;
  if (!token) {
    return res.status(404).json({msg: "unauthorized! please login first"});
  }
  try {
    const user = jwt.verify(token, "shhh");
    req.user = user.user;
    next();
  } catch (error) {
    return res.status(401).json({msg: "Token is invalid or expired"});
  }
}

module.exports = route2;
