const mongoose = require('mongoose')
const passportConfig = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.plugin(passportConfig, { usernameField: 'email' })

const User = mongoose.model('User', userSchema)
module.exports = User
