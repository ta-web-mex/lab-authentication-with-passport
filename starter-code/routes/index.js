const express = require('express');
const router  = express.Router();

const {
  signupGet,
  signupPost,
  loginGet,
  profileGet
} = require("../controllers/auth.controller");

const {
  isLoggedIn,
  isNotLoggedIn,
  checkRole
} = require("../middlewares/auth.middleware");

const passport = require("../config/passport");

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

//SIGNUP
router.get("/signup", signupGet);
router.post("/signup", signupPost);


//LOGIN
router.get("/login", isNotLoggedIn, loginGet);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect:"/login",
    successFlash: true,
    failureFalsh: true
  })
);

router.get("/profile", isLoggedIn, profileGet);


router.get(
  "/mastermind",
  isLoggedIn,
  checkRole("MASTERMIND"),
  (req, res, next) => {
    res.send("Welcome");
  }
);

router.get("/user", isLoggedIn, checkRole("USER"), (req, res, next) => {
  res.send("Hi!");
})

module.exports = router;