const User = require("../models/User")

exports.signupGet = (req, res) => {
  res.render("passport/signup")
}

exports.loginGet = (req, res) => {
  res.render("passport/login")
}

exports.signupPost = (req, res) => {
  const { email, password, username } = req.body
  User.register(
    {
      email,
      username
    },
    password
  )
    .then(user => res.redirect("/login"))
    .catch(err => {
      if (err.email === "UserExistsError") {
        return res.render("auth/signup", {
          msg: "youre already a member queen"
        })
      } else {
        console.log(err)
      }
    })
}
