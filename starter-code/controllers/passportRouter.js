const User = require('../models/User')
const passport = require('../config/passport')

exports.showSignUp = (req, res) => res.render('passport/signup')

exports.saveSignUp = async (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  await User.register({ email }, password).catch((err) => res.render('signup', err))
  res.redirect('/login')
}

exports.showLogin = (req, res) => res.render('passport/login')

exports.createLogin = passport.authenticate('local', {
  successRedirect: '/private-page',
  failureRedirect: '/login',
})

exports.doneLogin = (req, res) => res.render('passport/private')
