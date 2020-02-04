const User = require("../models/User");

exports.signupView = (req, res, next) => res.render('passport/signup');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (email === "" || password === "") {
    res.render("passport/signup",
     { message: "Debes llenar los recuadros no seas inutil"  });
  }
  const userOnDB = await User.findOne({ email });
    if (userOnDB !== null) {
      res.render("passport/signup", { message: "El correo ya fue registrado" });
    }
   await User.register({ name, email }, password);
  res.redirect("/login");
};

exports.loginView = (req, res) => {
  res.render("passport/login", { message: req.flash("error") });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
} 