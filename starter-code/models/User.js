const mongoose = require("mongoose");
const PLM = require('passport-local-mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String
  }, 
  {
    timestamps: true
  }
);

userSchema.plugin(PLM, {usernameField: 'email'})
const User = mongoose.model("User", userSchema);

//module.exports = User;

module.exports = User;
