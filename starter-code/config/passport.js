const passport = require("passport")
const User = require("../models/User")

//Creating the local strategy:
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport

