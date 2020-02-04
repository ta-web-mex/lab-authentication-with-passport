const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

//Creamos la constante PLM la cual sera asignada al plugin de passport local mongoose

const PLM = require('passport-local-mongoose')


const userSchema = new Schema(
  {
    email: String
  }, 
  {
    timestamps: true
  }
);

//PAsos para usar el esquema y agregar el plugin, hay que tener cuidado de ponerlo bien para que no tire mensaje de error
userSchema.plugin(PLM, {usernameField : "email"})
const User = mongoose.model("User", userSchema);

module.exports = User;
