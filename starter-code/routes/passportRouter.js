const express = require("express")
const passportRouter = express.Router()
const passport = require("passport")
const {
  signupGet,
  signupPost,
  loginGet,
  loginPost
} = require("../controllers/auth.controller")
// Require User model

// Signup Route
passportRouter.get("/signup", signupGet)
passportRouter.post("/signup", signupPost)

// Login Route
passportRouter.get("/login", loginGet)
// passportRouter.post("/login", loginPost)

// Logout Route

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", {
    user: req.user
  })
})

passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/private-page",
    failureRedirect: "/login"
  })
)

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter
