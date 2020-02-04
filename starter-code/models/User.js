const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const PLM=require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    username:String
  }, 
  {
    timestamps: true
  }
);

userSchema.plugin(PLM,{usernameField:"email"})

const User = mongoose.model("User", userSchema);
module.exports = User;
