const User = require('../models/User')

exports.singupGet = (req, res, next) => {
  res.render('../views/passport/signup')
}

exports.singupPost = async (req, res, next) => {
  const {email, password, confirmation} = req.body

  if (password != confirmation) {
    res.render('passport/signup', {message: "El password no coincide."})
  }

  const previousUser = await User.findOne({email})
  if (previousUser != null) {
    res.render('passport/signup', {message: 'El usuario ya está registrado.'})
  }
  
  await User.register({email}, password)
  res.redirect("/login")

}

exports.loginGet = (req, res, next) => {
  res.render('passport/login')
}

exports.logout = (req, res, next) => {
  req.logout()
  res.redirect('/login')
}