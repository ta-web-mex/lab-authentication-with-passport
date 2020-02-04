const express = require('express');
const passport = require("passport");
const router=express();


const {
  signUpView,
  signUpPost,
  logInView,
  logInPost,
  privateView
}=require("../controllers/authControllers.js")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//Signup
router.get("/signup",signUpView);
router.post("/signup",signUpPost);

//LogIn
router.get("/login",logInView);
//router.post("/login",logInPost)

router.post("/login", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/login",
  failureFlash: true,
}));

router.get("/private", privateView,);

module.exports = router;
