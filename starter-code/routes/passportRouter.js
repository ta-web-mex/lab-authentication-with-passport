const express        = require("express");
const router = express.Router();
const passport     = require("../config/passport")


// Require User model
const user = require('../models/User')
// Signup Route
router.get("/signup", (_, res) => res.render("passport/signup"));

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  user.register( { email }, password)
    .then(user =>res.redirect("/login"))
    .catch(err => {
      if (err.name === "UserExistsError") {
        return res.render("/signup", {msg: "User already exists"});
      }
    })
})
// Login Route

router.get('/login', (_, res)=> res.render('passport/login'))
router.post('/login', passport.authenticate("local", {
  successRedirect: "/private-page",
  failureRedirect: "/login"
}))

// Logout Route
router.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = router;
