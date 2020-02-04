const express        = require("express");
const passportRouter = express.Router();
const passport = require("../config / passport")
const {signupView, loginView, logout, signup, private} = require("../controllers / index")

// Require User model
//const User = require("../models/User")

// Signup Route
passportRouter.get("/signup", signupView)
passportRouter.post("/signup", signup)
// Login Route
passportRouter.get("/loging", loginView)
passportRouter.post(  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
)
// Logout Route
passportRouter.get("/loging", logout)

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});
passportRouter.post("/private", private)
function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
