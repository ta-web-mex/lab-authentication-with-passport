const express = require('express')
const passportRouter = express.Router()
const passport = require('../config/passport')

const { signupView, signupPost, loginView, loginPost, logout } = require('../controllers/index')
// Require User model

// Signup Route
passportRouter.get('/signup', signupView)
passportRouter.post('/signup', signupPost)
// Login Route
passportRouter.get('/login', loginView)
passportRouter.post('/login', loginPost)

// Logout Route
passportRouter.get('/logout', logout)
passportRouter.get('/private-page', ensureLogin, (req, res) => {
  res.render('passport/private', { user: req.user })
})

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}

module.exports = passportRouter
