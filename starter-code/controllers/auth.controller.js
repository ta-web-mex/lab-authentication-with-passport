require("dotenv").config();

const User = require("../models/User");

exports.signupGet = (_, res) => res.render("auth/signup");

exports.signupPost = (req, res, next) => {
  const { name, email, password, passwordrepeat, role } = req.body; // vienen del form
  if (password !== passwordrepeat) {
    return res.render("auth/signup", {
      msg: "Passwords must be the same"
    });
  }
  // registrer existe gracias a PLM
  User.register({ name, email, role }, password)
    .then(user => res.redirect("/login"))
    .catch(err => {
      if (err.name === "UserExistsError") {
        return res.render("auth/signup", {
          msg: "Yo have already registered"
        });
      }
    });
};

exports.loginGet = async (req, res) => {
res.render("passport/login", {msg:req.flash("error")})
};

exports.profileGet = (req, res) => {
  res.render("passport/profile", {user:req.user});
}