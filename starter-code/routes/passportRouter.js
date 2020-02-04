const express        = require("express");
const passportRouter = express.Router();

const passport=require("../config/config");
const { signupView, signup, loginView, logout } = require("../controllers/Controllers");

// Require User model
const Models = require("../models/User");
// Signup Route
passportRouter.get('/signup', signupView);
passportRouter.post('/signup', signup);
// Login Route

passportRouter.get('/login', loginView);
passportRouter.post("/login",
  passport.authenticate("local", {
    successRedirect: "/private-page",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// Logout Route

passportRouter.get("/logout", logout);

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
