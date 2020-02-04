const express        = require("express");
const passportRouter = express.Router();
const passport = require('../config/passport')


// Require User model
const User = require('../models/User')
const {
signupView,
signup,
loginView,
logout} = require('../controllers/index')


// Signup Route
passportRouter.get('/signup', signupView)
passportRouter.post("/signup", signup);

// Login Route

passportRouter.get('/login', loginView)
passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/private-page",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// Logout Route

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

passportRouter.get("/logout", logout)

module.exports = passportRouter;
