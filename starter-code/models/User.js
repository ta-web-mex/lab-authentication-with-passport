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
userSchema.plugin(PLM, { usernameField: 'email'})
module.exports = model('User', userSchema)


