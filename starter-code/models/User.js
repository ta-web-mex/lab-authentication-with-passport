const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
  email: String
}, {
  timestamps: true
});


// como PLM utiliza por default el field "username", le decimos que utilice otro alterno, (email)
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

const User = mongoose.model("User", userSchema);
module.exports = User;