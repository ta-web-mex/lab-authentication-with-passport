const { model, Schema } = require("mongoose")
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    email: String
  }, 
  {
    timestamps: true
  }
);

//Is it the same to use two ticks or one? Makes any difference?
userSchema.plugin(PLM, { usernameField: "email"})
module.exports = model("User", userSchema)

/*
I don't get very well why I don't have to declare the User variable
in the lines of code above.
Is it because I already destructured in line 1?
const User = mongoose.model("User", userSchema);
module.exports = User;
*/


