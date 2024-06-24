const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  catogary: {
    type: String,
  },
  priority: {
    type: String,
    required: true,
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "assignUser",
  },
  todosList: [
    {
      type: String,
      isCompleted: Boolean,
      required: true,
    },
  ],
  dueData: {
    type: String,
  },
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
