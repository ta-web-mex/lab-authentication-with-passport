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
  
}


