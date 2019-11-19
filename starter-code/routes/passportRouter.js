const express = require("express");
const passportRouter = express.Router();
const passport = require("passport");
const flash = require("connect-flash");

// Require User model
const User = require("../models/User");
// Signup Route
passportRouter.get("/singup", (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.post("/signup", (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (email === "" || password === "") {
    return res.render("passport/signup", {
      message: "You must type your email and password"
    });
  }

  User.findOne({
      email
    })
    .then(user => {
      if (user !== null) {
        return res.render("passport/signup", {
          message: "Email already in use"
        });
      }
    })
    .catch(error => {
      next(error);
    });

  User.register({

      email
    }, password)
    .then(userCreated => {
      console.log("user has been created");
      res.redirect("private-page");
    })
    .catch(error => {
      next(error);
    })
});




// Login Route

passportRouter.get("/login", (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));


// authentication page

function ensureLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", {
    user: req.user
  });
});

// Logout Route
passportRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});




module.exports = passportRouter;