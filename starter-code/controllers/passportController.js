const User = require('../models/User')

exports.signupView = (req, res, next) => {
  res.render('passport/signup')
}
exports.loginView = (req, res) => {
  res.render("passport/login", { message: req.flash("error") })
}


exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (email.length == 0 || password.length == 0) {
    res.render("passport/signup", { message: "Password AND email are needed to register"  });
  }

  const userFound = await User.findOne({ email });
  if (userFound !== null) {
     res.render("passport/signup", { message: "User already exists" }); 
    }
  await User.register({ email }, password);
  res.redirect("/login");
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
} 