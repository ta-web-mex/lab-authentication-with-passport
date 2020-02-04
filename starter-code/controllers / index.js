const User = require("../models/User");

exports.signupView = (req, res) => {
  res.render("passport/signup");
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("passport/signup", {
      message: "Ingresa Usuario o contraseña"
    })
  }
const userOnDB = await User.findOne({ email });
if (userOnDB !== null) {
  res.render("passport/signup", { message: "El correo ya fue registrado" });
}
await User.register({ email }, password);
res.redirect("/login");
}
exports.loginView = (req, res) => {
  res.render("passport/login", { message: req.flash("error") });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

exports.private = (req, res) => {
  res.render("passport/private"), {user: req.user}
}