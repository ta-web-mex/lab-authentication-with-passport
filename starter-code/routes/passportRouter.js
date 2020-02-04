const express        = require("express");
const passportRouter = express.Router();

const passport = require('../config/passport')

const {
  singupGet,
  singupPost,
  loginGet,
  logout
} = require('../controllers/index')

// Require User model

// Signup Route
passportRouter.get('/signup', singupGet)
              .post('/signup', singupPost)

// Login Route
passportRouter.get("/login", loginGet)
              .post("/login", passport.authenticate("local", {
                  successRedirect: "/private-page",
                  failureRedirect: "/login",
                  failureFlash: true
                }
              ))

// Logout Route
passportRouter.get('/logout', logout)

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
