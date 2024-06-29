const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  catogary: {
    type: String,
  },
  priority: {
    type: String,
  },
  assignTo: {
    type:String,
  },
  todosList: [
    {
      todoContent: String,
      isCompleted: Boolean,
    },
  ],
  date: {
    type: String,
  },
}, { timestamps: true });

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
