const User=require('../models/User')

exports.signupGet=(req,res)=>
{
  res.render('passport/signup')
}

exports.signupPost=async (req,res)=>{
  const {email,password,passwordConfirm,username}=req.body
  //validamos que los campos de email y los passwords no esten vacíos
  if (email ==="" || password ==="" || passwordConfirm==="" || username===""){
    res.render("passport/signup",{message:"Debes llenar username, email y passwords."})
  }
  
  //Validamos que ambos passwords coincidan
  if (password !== passwordConfirm){
    res.render("passport/signup",{message:"Los password deben coincidir."})
  }
  
  //validamos si ya hay un usuario con ese email
  const userAnterior= await User.findOne({email})
  if (userAnterior!== null) {
    res.render("passport/signup",{message: "El correo ya cuenta con un usuario"})
  }
  await User.register({username,email},password)
  res.redirect("/login")
}
exports.loginGet=(reg,res)=>{
  res.render("passport/login")
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};