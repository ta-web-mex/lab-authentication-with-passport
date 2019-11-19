const { Schema, model }   = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema(
  {
    email: String,
    name: String,
    role: {
      type: String,
      enum:["USER", "MASTERMIND"]
    }
  }, 
  {
    timestamps: true,
    versionKey: false
  }
);

//por PLM seteamos email como username 
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = model("User", userSchema);
