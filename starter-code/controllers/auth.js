require("dotenv").config();

const User = require("../models/User");

exports.signupGet = (_, res) => res.render("auth/signup");

exports.signupPost = (req, res, next) => {
  const { name, email, password } = req.body; // vienen del form
  User.register({ name, email }, password)
    .then(user => res.redirect("passport/login"))
    .catch(err => {
      if (err.name === "UserExistsError") {
        return res.render("auth/signup", {
          msg: "User already exists"
        });
      }
    });
};

exports.loginGet =  (req, res) => {
  res.render("passport/login", { msg: traducido });
};