const express        = require("express");
const passportRouter = express.Router();
const passport       = require("passport")


// Require User model
const User = require("../models/User")

passport.initialize()
passport.session()
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Signup Route
passportRouter.get("/signup", (req, res) => res.render("../views/passport/signup.hbs"))

passportRouter.post("/signup", (req, res) => {
  const {email, password} = req.body
  User.register({email}, password)
    .then(user => res.redirect("/"))
    .catch(() => res.redirect("/signup"))
})
// Login Route
passportRouter.get("/login", (req, res) => res.render("../views/passport/login.hbs"))
passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});
passportRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/private-page",
    failureRedirect: "/"
  })
)

// Logout Route
function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}
module.exports = passportRouter;