//se genera  la estrategia


const passport = require("passport");
const User = require("../models/User");

//estrategia 

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;