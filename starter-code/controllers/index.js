const User = require('../models/User');


exports.signupView = (req, res) => {
    res.render('passport/signup')
}

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;
console.log('user', req.body);

    if (email === "" || password === "") {
        res.render('passport/signup', {
            message: 'Campos incompletos'
        })
    }
    const userOnDB = await User.findOne({ email });
  if (userOnDB !== null) {
    res.render("passport/signup", { message: "El correo ya fue registrado" });
  }
  await User.register({ email }, password);
  res.redirect("/login");
};

exports.loginView = (req, res) => {
  res.render("passport/login", { message: req.flash("error") });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};




