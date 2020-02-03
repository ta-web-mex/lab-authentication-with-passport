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

const User = mongoose.model("User", userSchema);
userSchema.plugin(PLM, {userNameField: 'email'})
//module.exports = User;

module.exports = model('User', userSchema);
