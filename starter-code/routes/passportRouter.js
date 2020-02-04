const express        = require("express");
const passportRouter = express.Router();
const {signup, signupView, loginView, login} = require('../contollers/authController')
// Require User model
const User = require('../models/User')
const passport = require('../config/passport')



// Signup Route
passportRouter.get('/signup', signupView)
passportRouter.post('/signup', signup)

// Login Route
passportRouter.get('/login', loginView)
passportRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}))


// Logout Route
passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
