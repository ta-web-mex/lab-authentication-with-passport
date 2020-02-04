const passport = require('passport')
const User = require('../models/User')

passport.use(User.createStrategy());
//local strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport