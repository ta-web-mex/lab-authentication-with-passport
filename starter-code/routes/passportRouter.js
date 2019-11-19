const express = require("express");
const passportRouter = express.Router();
const {
  signupGet,
  signupPost,
  loginGet,
} = require("../controllers/controllers");

const passport = require("../config/passport");

// SIGNUP
passportRouter.get("/signup", signupGet);
passportRouter.post("/signup", signupPost);

// LOGIN
passportRouter.get("/login", isNotLoggedIn, loginGet);

function isNotLoggedIn (req, res, next) {
  !req.isAuthenticated() ? next() : res.redirect("/private-page");
};

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/private-page",
  failureRedirect: "/login"
})
)

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  console.log(req.user);
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  console.log(req.isAuthenticated())
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

// Logout Route
passportRouter.get("/logout", (req, res, next)=>{
  req.logout();
  res.redirect("/login")
})
module.exports = passportRouter;
