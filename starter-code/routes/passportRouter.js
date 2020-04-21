const express = require('express');
const passportRouter = express.Router();
const passport = require('../config/passport');

// Require User model
const User = require('../models/User');
// Signup Route
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});
passportRouter.post('/signup', (req, res, next) => {
  const { email, password, verify } = req.body;
  password !== verify
    ? res.render('passport/signup', { err: 'Passwords dont match' })
    : User.register({ email }, password)
        .then(() => res.redirect('/login'))
        .catch((err) => res.render('passport/signup', { err }));
});

// Login Route
passportRouter.get('/login', (req, res, next) => res.render('passport/login'));
passportRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/private-page',
    failureRedirect: '/login',
  })
);

// Logout Route
passportRouter.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

passportRouter.get('/private-page', ensureLogin, (req, res) => {
  res.render('passport/private', { user: req.user });
});
function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login');
}

module.exports = passportRouter;
