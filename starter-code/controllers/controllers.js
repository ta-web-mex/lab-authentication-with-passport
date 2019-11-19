require("dotenv").config();

const User = require("../models/User");

exports.signupGet = (_, res) => res.render("passport/signup");

exports.signupPost = (req, res, next) => {
  const { email, password, passwordrepeat } = req.body; // vienen del form
  if (password !== passwordrepeat) {
    return res.render("passport/signup", {
      msg: "Passwords must be the same"
    });
  }
  // solo porque el user tiene plm, podemos utilizar register
  User.register({ email }, password)
    .then(user => res.redirect("/login"))
    .catch(err => {
      if (err.name === "UserExistsError") {
        return res.render("passport/signup", {
          msg: "Email already register"
        });
      }
    });
};

exports.loginGet = async (req, res) => {
  res.render("passport/login", { msg: "Error" });
};


