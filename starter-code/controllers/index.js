const User = require('../models/User')
const passport = require('../config/passport')

exports.indexGet = (req, res) => res.render('index')


exports.signupGet = (req, res) => {
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
    signup: true,
  }
  res.render('passport/signup', config)
}

exports.signupPost = (req, res) => {
  const {name, email, password, verify}= req.body
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
    signup: true,
    error: 'La contraseña es incorrecta'
  }
if (password !== verify) {
  return res.render('/signup', config)
} else {
  User.register({ name, email }, password)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      config.error = err.message
      return res.render('passport/signup', config)
    })
}
}

exports.loginGet = (req, res) => {
  const config = {
    action: '/login',
    title: 'Log in',
    button: 'Login',
    signup: false,
  }
  res.render('passport/login')
}

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/private-page',
  failureRedirect: '/login',
})

