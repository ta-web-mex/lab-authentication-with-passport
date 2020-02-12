const User = require("../models/User")
const passport = require("../config/passport")

exports.signupView = (req, res) => {
  res.render("passport/signup");
};

exports.signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.render("passport/signup", {
      message: "Please confirm your password correctly."
    })
  }

  if (email === "" || password === "") {
    res.render("passport/signup", {
      message: "You require to establish an email and a password."
      })
    }

    const userOnDB = await User.findOne({ email });
    if (userOnDB !== null) {
      res.render("passport/signup", { Message: "This email has already been registered" });
    }

    await User.register({ email }, password);
    res.redirect("/login");
}

exports.loginView = (req, res) => {
  res.render("passport/login")
}
//res.render("auth/login", { message: req.flash("error") });
//I used the req.flash as declared above but the console throwed me an error telling me that
//it was not a function.
//I installed the package and got the same result.

exports.login = (req, res) => {
  res.render(
    "passport/login",
    passport.authenticate("local", {
    successRedirect: "/private",
    failureRedirect: "/login",
    failureFlash: true,
    })
  )
}

//In the example seen in class, this was as a router.post on authRoutes, but in the 
//sprint it says to do this here and export it, so this is the way I thought it could be done.
//At this point I think my program is completly broken.


exports.private = (req, res) => {
  res.render("passport/private", { user: req.email });
}


exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
