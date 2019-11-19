const express        = require("express");
const passportRouter = express.Router();
const passport = require("passport");
// Require User model
const User = require("../models/User");

// Signup Route
passportRouter.get("/signup", (req, res) =>{
  res.render("passport/signup");
});

passportRouter.post("/signup",(req,res) =>{
    const{email,password} = req.body;
    User.register({email},password)
    .then(user => res.redirect("/private-page"))
    .catch(() =>res.redirect("/signup"))
});


// Login Route
passportRouter.get("/login",(req,res)=>{
 res.render("passport/login");
});
/*
passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});
passportRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/private-page",
    failureRedirect: "/"
  })
)*/


// Logout Route

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;

