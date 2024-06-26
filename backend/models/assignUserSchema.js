const mongoose = require("mongoose");

const assignUserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true, 
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const assignedUserModel = mongoose.model("assignUser", assignUserSchema);
module.exports = assignedUserModel;
