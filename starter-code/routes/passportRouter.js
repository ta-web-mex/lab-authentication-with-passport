const express        = require("express");
const passportRouter = express.Router();
const passport = require("../config / passport")
const {signupView, loginView, logout, signup} = require("../controllers / index")

// Require User model
//const User = require("../models/User")

// Signup Route
passportRouter.get("/signup", signupView)
passportRouter.post("/signup", signup)
// Login Route
passportRouter.get("/login", loginView)
passportRouter.post( "/login",
  passport.authenticate("local", {
    successRedirect: "/private-page",
    failureRedirect: "/login",
    failureFlash: true
  })
)
// Logout Route
passportRouter.get("/loging", logout)

//est se pasa a app.js
/*passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});
//esto se pasa a middlewares
//passportRouter.post("/private", private)
function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}*/

module.exports = passportRouter;
