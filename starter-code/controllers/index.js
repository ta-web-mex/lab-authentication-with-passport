const User = require('../models/User')
const passport = require('../config/passport')

exports.signupView = (req, res) => {
  res.render('passport/signup')
}

exports.signupPost = (req, res) => {
  const { name, email, password, verify } = req.body
  if (password !== verify) {
    return res.render('passport/signup', { error: 'Passwords don`t match' })
  } else {
    User.register({ email }, password)
      .then(() => {
        res.redirect('/login')
      })
      .catch((err) => err)
  }
}

exports.loginView = (req, res) => {
  res.render('passport/login')
}

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/private-page',
  failureRedirect: '/login',
})

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
