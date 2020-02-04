const express        = require("express");
const passport = require("../config/passport")
const passportRouter = express.Router();
const {
  signupView,
  signup,
  loginView
} = require("../controllers/index")

// Require User model
const User = require("../models/User")

// Signup Route
passportRouter.get("/signup", signupView)
passportRouter.post("/signup", signup)

// Login Route
passportRouter.get("/login", loginView)

passportRouter.post(
  "/login",
  passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  })
)

// Logout Route

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
