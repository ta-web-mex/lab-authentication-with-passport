const User = require('../models/User')

exports.signupView = (req,res) =>{
  res.render('passport/signup')
}

exports.signup = async(req, res) =>{
  const {name, email, password} = req.body
  if(email === "" || password === ""){
    res.render('passport/signup', {
      message: "Completa los campos"
    })
  }
  const userOnDB =await User.findOne({email});
  if (userOnDB !== null){
    res.render('auth/signup', {message: 'El correo ya fue registrado'})
  }
  await User.register({name, email}, password)
  res.redirect('/login')
}


