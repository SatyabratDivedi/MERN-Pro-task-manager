const mongoose = require("mongoose");
const assignedUserModel = require("./assignUserSchema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  assignedUsers: [
    {
      type: String,
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
