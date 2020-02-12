const express        = require("express");
const passport = require("../config/passport")
const passportRouter = express.Router();

const {
  signupView,
  signup,
  loginView,
  login,
  private,
  logout
} = require("../controllers/index")

// Signup Route
passportRouter.get("/signup", signupView)
passportRouter.post("/signup", signup)

// Login Route
passportRouter.get("/login", loginView)
passportRouter.post("/login", login)

// Logout Route
passportRouter.get("/", logout)

passportRouter.get("/private", ensureLogin, private)
function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
