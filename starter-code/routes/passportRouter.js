const express = require('express')
const passportRouter = express.Router()

const {
  showSignUp,
  saveSignUp,
  showLogin,
  createLogin,
  doneLogin,
} = require('../controllers/passportRouter')

// Signup Route
passportRouter.get('/signup', showSignUp)
passportRouter.post('/signup', saveSignUp)

// Login Route
passportRouter.get('/login', showLogin)
passportRouter.post('/login', createLogin)

passportRouter.get('/private', doneLogin)
// Logout Route

passportRouter.get('/private-page', ensureLogin, (req, res) => {
  res.render('passport/private', { user: req.user })
})

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}

module.exports = passportRouter
