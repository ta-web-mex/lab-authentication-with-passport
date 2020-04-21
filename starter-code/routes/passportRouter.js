const express = require('express')
const passportRouter = express.Router()
const { signupView, signupAdd, loginView, loginAdd, logout } = require('../controllers/index')
// Require User model

// Signup Route
passportRouter.get('/signup', signupView)
passportRouter.post('/signup', signupAdd)
// Login Route
passportRouter.get('/login', loginView)
passportRouter.post('/login', loginAdd)
// Logout Route
passportRouter.get('/logout', logout)
// Private Route
passportRouter.get('/private-page', ensureLogin, (req, res) => {
  res.render('passport/private', { user: req.user })
})

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}

module.exports = passportRouter
