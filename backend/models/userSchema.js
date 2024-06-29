const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  assignedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assignUser",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
