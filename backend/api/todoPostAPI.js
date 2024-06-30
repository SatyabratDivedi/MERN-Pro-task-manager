const express = require("express");
const route2 = express();
const userModel = require("../models/userSchema");
const postModel = require("../models/postSchema");
const assignUserModel = require("../models/assignUserSchema");
var jwt = require("jsonwebtoken");

route2.post("/createPost", authCheck, async (req, res) => {
  try {
    const {title, catogary, priority, assignTo, Checklist, date} = req.body;
    if (!title) return res.status(400).json({msg: "Title is required"});
    if (!priority) return res.status(400).json({msg: "Priority is required"});
    if (Checklist.length === 0) return res.status(400).json({msg: "At least one todo is required"});
    const findUser = await userModel.findOne({email: req.user.email});
    const findAssignUser = await assignUserModel.findOne({email: assignTo});
    const findAssignUserInMainUser = await userModel.findOne({email: assignTo});
    const newPost = await new postModel({
      user: findUser._id,
      title,
      catogary,
      assignTo: findAssignUser && assignTo,
      priority,
      todosList: Checklist,
      date,
    }).save();

    if (findAssignUser) {
      findAssignUser.posts.push(newPost._id);
      await findAssignUser.save();
      findAssignUserInMainUser.posts.push(newPost._id);
      await findAssignUserInMainUser.save();
    }
    findUser.posts.push(newPost._id);
    await findUser.save();
    const updatedUser = await userModel.findById(findUser._id).populate("posts");
    return res.status(200).json({msg: "post created successfully"});
  } catch (error) {
    return res.status(404).send({msg: "something went wrong"});
  }
});

route2.get("/get_all_posts", authCheck, async (req, res) => {
  try {
    const findLoginUser = await userModel.findById(req.user._id).populate("posts");
    const allPostsAndAssignUsres = [...findLoginUser.posts];
    const todoPosts = allPostsAndAssignUsres.filter((post) => post.catogary == "TODO");
    const backlogPosts = allPostsAndAssignUsres.filter((post) => post.catogary == "BACKLOG");
    const inProcessPosts = allPostsAndAssignUsres.filter((post) => post.catogary == "PROGRESS");
    const donePosts = allPostsAndAssignUsres.filter((post) => post.catogary == "DONE");
    const lowPriorityPosts = allPostsAndAssignUsres.filter((post) => post.priority == "LOW PRIORITY");
    const moderatePriorityPosts = allPostsAndAssignUsres.filter((post) => post.priority == "MODERATE PRIORITY");
    const highPriorityPosts = allPostsAndAssignUsres.filter((post) => post.priority == "HIGH PRIORITY");
    return res.status(200).json({
      ALLPOSTS: allPostsAndAssignUsres,
      TODO: todoPosts,
      BACKLOG: backlogPosts,
      INPROCESS: inProcessPosts,
      DONE: donePosts,
      LOWPRIORITY: lowPriorityPosts,
      MODERATEPRIORITY: moderatePriorityPosts,
      HIGHPRIORITY: highPriorityPosts,
    });
  } catch (error) {
    return res.status(404).send({msg: "something went wrong"});
  }
});

route2.get("/getOnePost/:postId", async (req, res) => {
  const postId = req.params.postId;
  if(postId.length < 24){
    return res.status(404).json({msg: "Post not found"});
  }
  const findPost = await postModel.findById(postId);
  if (!findPost) {
    return res.status(404).json({msg: "Post not found"});
  }
  try {
    return res.status(200).json(findPost);
  } catch (error) {
    return res.status(404).send({msg: "something went wrong"});
  }
});

route2.put("/updatePostCatogary", authCheck, async (req, res) => {
  try {
    const {postId, catogary} = req.body;
    const findPost = await postModel.findById(postId);
    if (!findPost) {
      return res.status(404).json({msg: "Post not found"});
    }
    findPost.catogary = catogary;
    await findPost.save();
    return res.status(200).json({msg: "post category updated"});
  } catch (error) {
    return res.status(404).json({msg: "something went wrong"});
  }
});

route2.put("/updatePost/:postId", authCheck, async (req, res) => {
  const postId = req.params.postId;
  try {
    const {title, priority, assignTo, Checklist, date} = req.body;
    const findPost = await postModel.findById(postId);
    if (!findPost) {
      return res.status(404).json({msg: "Post not found"});
    }
    const oldAssighUser = await assignUserModel.findOne({email: findPost.assignTo});
    const newAssignUser = await assignUserModel.findOne({email: assignTo});
    const oldAssighUserMainAcc = await userModel.findOne({email: findPost.assignTo});
    const newAssignUserMainAcc = await userModel.findOne({email: assignTo});
    if (!oldAssighUser && !newAssignUser) {
    } else if (!oldAssighUser && newAssignUser) {
      newAssignUser.posts.push(findPost._id);
      await newAssignUser.save();
      findPost.assignTo = newAssignUser.email;
      await findPost.save();
      newAssignUserMainAcc.posts.push(findPost._id);
      await newAssignUserMainAcc.save();
    } else if (oldAssighUser && newAssignUser) {
      if (oldAssighUser.email != newAssignUser.email) {
        oldAssighUser.posts = oldAssighUser.posts.filter((post) => post._id.toString() != findPost._id.toString());
        await oldAssighUser.save();
        newAssignUser.posts.push(findPost._id);
        await newAssignUser.save();
        findPost.assignTo = newAssignUser.email;
        await findPost.save();
        oldAssighUserMainAcc.posts = oldAssighUserMainAcc.posts.filter((post) => post._id.toString() != findPost._id.toString());
        await oldAssighUserMainAcc.save();
        newAssignUserMainAcc.posts.push(findPost._id);
        await newAssignUserMainAcc.save();
      } else {
        findPost.assignTo = newAssignUser.email;
        await findPost.save();
      }
    }
    findPost.title = title;
    findPost.priority = priority;
    findPost.todosList = Checklist;
    findPost.date = date;
    await findPost.save();
    return res.status(200).json({msg: "post updated successfully"});
  } catch (error) {
    return res.status(404).json({msg: "something went wrong"});
  }
});

route2.put("/updateCheckList/", authCheck, async (req, res) => {
  const {todo, post} = req.body;
  try {
    const findPost = await postModel.findById(post._id);
    if (!findPost || !todo || !post) {
      return res.status(404).json({msg: "Post not found"});
    }
    const findTodo = findPost.todosList.find((item) => item._id.toString() == todo._id.toString());
    if (findTodo) {
      await postModel.findByIdAndUpdate(
        post._id,
        {$set: {"todosList.$[todoItem].isCompleted": !findTodo.isCompleted}},
        {
          arrayFilters: [{"todoItem._id": todo._id}],
          new: true,
        }
      );
      res.status(200).send("checklist update");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    res.status(500).send({msg: "Error updating todo"});
  }
});

route2.delete("/deletePost/:postId", authCheck, async (req, res) => {
  const postId = req.params.postId;
  const loginUserEmail = req.user.email;
  const findPostForDelete = await postModel.findById(postId);
  try {
    if (!findPostForDelete) {
      return res.status(404).json({msg: "Post not found"});
    }
    if (loginUserEmail == findPostForDelete.assignTo) {
      return res.status(404).json({msg: "Only admin can delete this post!"});
    }
    await postModel.findByIdAndDelete(postId);
    const loginUser = await userModel.findOne({email: loginUserEmail});
    if (loginUser) {
      loginUser.posts = loginUser.posts.filter((post) => post._id.toString() !== postId);
      await loginUser.save();
    }
    const assignUser = await userModel.findOne({email: findPostForDelete.assignTo});
    if (assignUser) {
      assignUser.posts = assignUser.posts.filter((post) => post._id.toString() !== postId);
      await assignUser.save();
    }
    const findUserInAssing = await assignUserModel.findOne({email: findPostForDelete.assignTo});
    if (assignUser) {
      findUserInAssing.posts = findUserInAssing.posts.filter((post) => post._id.toString() != postId);
      await findUserInAssing.save();
    }
    return res.status(200).json({msg: "post deleted successfully"});
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
