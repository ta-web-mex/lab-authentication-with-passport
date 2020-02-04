//Primero debemos inicializarr el passport, bueno un nrequire

const passport = require('passport')
const User = require("../models/User")
//Creamos la estrategia que utilizaremos
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Presedmos a exportr el modelo
module.exports = passport;
