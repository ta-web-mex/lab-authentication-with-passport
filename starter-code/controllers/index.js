const User = require("../models/User")

exports.signupView = (req, res) => {
  res.render("passport/signup");
};

exports.signup = async (req, res) => {
  const { email, /*confirmMail*/ password } = req.body;

  if (email === "" || password === "") {
    res.render("passport/signup", {
      message: "You require to establish an email and a password."
      })
    }
  /*if (email !== confirmMail) {
    res.render("passport/signup", {
      message: "Please confirm your email correctly."
      })
    } I tried this code in conjunction with the one on my signup.hbs to verify for the same 
    password. But I think it does not work correctly so I left it in comments.*/
    const userOnDB = await User.findOne({ email });
    if (userOnDB !== null) {
      res.render("passport/signup", { Message: "This email has already been registered" });
    }

    await User.register({ email }, password);
    res.redirect("/login");
}

exports.loginView = (req, res) => {
  res.render("passports/login", { message: req.flash("error")})
}

//  res.render("auth/login", { message: req.flash("error") });
//I used the req.flash as declared above but the console throwed me an error telling me that
//it was not a function.
//I don't grasp what req.flash does.