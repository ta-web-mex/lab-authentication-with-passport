const User = require('../models/User')
const passport = require('../config/passport')

exports.signupView = (req, res) => {
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
    signup: true,
  }
  res.render('passport/signup', config)
}

exports.signupAdd = (req, res) => {
  const { name, email, password, verify } = req.body
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
    error: 'Invalid credentials, please verify your password',
  }
  if (password !== verify) {
    return res.render('passport/signup', config)
  } else {
    User.register({ name, email }, password)
      .then(() => res.redirect('/login'))
      .catch((err) => {
        config.error = err.message
        return res.render('passport/signup', config)
      })
  }
}

exports.loginView = (req, res) => {
  const config = {
    action: '/login',
    title: 'Log in',
    button: 'Log in',
  }
  res.render('passport/login', config)
}

exports.loginAdd = passport.authenticate('local', {
  successRedirect: '/private-page',
  failureRedirect: '/login',
})

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}
