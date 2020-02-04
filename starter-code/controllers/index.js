// Require User model
const User = require("../models/User")

// Export SignupView 
exports.signupView = (req, res) => {
  res.render("passport/signup")
}

exports.signupPost = async (req, res) => {
  const { email, password } = req.body

  if(email === "" || password === "") {
    res.render("passport/signup", {
      message: "Falta introducir E-mail y contraseña"
    })
  }

//Checar en la base de datos si existe
const useronDataBase = await User.findOne({email})
  if (useronDataBase !== null) {
    res.render("passport/signup", {message: "El correo ya existe"})
  }
  await User.register({email}, password)
    res.redirect("/login")
}

//LoginView
  exports.loginView = (req, res) => {
    res.render("passport/login", {message: req.flash("error")})
  }

  //Logout
  exports.logout = (req,res) => {
    req.logout()
    res.redirect("/login")
  }
