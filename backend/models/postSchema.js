const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  assignTo: [
    {
      type: String,
    },
  ],
  todosList: [
    {
      type: String,
      isCompleted: Boolean,
    },
  ],
  dueData: {
    type: String,
  },
  catogary: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
