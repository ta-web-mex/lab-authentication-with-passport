const express = require("express");
const passportRouter = express.Router();
const passport = require('../config/passport')
const {
  signupView,
  loginView,
  signup,
  logout
} = require('../controllers/index')

const User = require('../models/User');

passportRouter.get('/signup', signupView)
passportRouter.post('/signup', signup)
passportRouter.get('/login', loginView)
passportRouter.post('/login',
  passport.authenticate('local', {
    successRedirect: '/private-page',
    failureRedirect: '/login',
    failureFlash: true
  })
)


passportRouter.get('/logout', logout);
passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", {
    user: req.user
  });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;