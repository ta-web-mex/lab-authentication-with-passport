const express        = require("express");
const passportRouter = express.Router();
const passport = require("../config/passport");
const {signupGet,
        signupPost,
        loginGet,
        logout
}=require('../controllers/index')

// Require User model
//esto se hace en el apartado de controllers

// Signup Route
passportRouter.get("/signup",signupGet)
              .post("/signup",signupPost)
// Login Route
passportRouter.get("/login",loginGet)
              .post("/login",passport.authenticate("local", {
                  successRedirect: "/private-page",
                  failureRedirect: "/login",
                  failureFlash: true
                }
              ))
// Logout Route
passportRouter.get("/logout", logout);
/*
passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});


function ensureLogin (req, res, next) {
  return req.isAuthenticated() ? next() : res.send("no autenticado")//res.redirect("/login")
}*/

module.exports = passportRouter;
