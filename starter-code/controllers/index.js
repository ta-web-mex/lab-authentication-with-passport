const User = require('../models/User')

exports.signupView = (req,res) =>{
  res.render('passport/signup')
}

exports.signup = async(req, res) =>{
  const {email, password} = req.body
  if(email === "" || password === ""){
    res.render('passport/signup', {
      message: "Completa los campos"
    })
  }
  const userNot =await User.findOne({email});
  if (userNot !== null){
    res.render('passport/signup', {message: 'El correo ya fue registrado'})
  }
  await User.register({email}, password)
  res.redirect('/login')
}

exports.loginView = (req, res) =>{
  res.render('passport/login')
}



