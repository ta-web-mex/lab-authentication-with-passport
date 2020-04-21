const express = require('express')
const passportRouter = express.Router()

const { signupGet, signupPost, loginGet, loginPost, logout } = require('../controllers')

// Signup Route

passportRouter.get('/signup', signupGet)
passportRouter.post('/signup', signupPost)

// Login Route

passportRouter.get('/login', loginGet)
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
