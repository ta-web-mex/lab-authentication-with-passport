const express        = require("express");
const passportRouter = express.Router();


// Require User model
const User = require('models/User')


// Signup Route
passportRouter.get('signup', signupView)


// Login Route

// Logout Route

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
