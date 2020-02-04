const User = require('../models/User')

exports.signupView = (req, res, next) => res.render('passport/signup')
exports.loginView = (req, res) => res.render("passport/login", { message: req.flash("error") })


exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (email === "" || password === "") {
    res.render("passport/signup", { message: "Debes ingresar email y contraseña"  });
  }

  const userFound = await User.findOne({ email });
  if (userFound !== null) { res.render("passport/signup", { message: "Usuario yaregistrado" }); }
  await User.register({ email }, password);
  res.redirect("/login");
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
}