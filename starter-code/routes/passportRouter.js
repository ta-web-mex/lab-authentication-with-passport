const express = require("express");
const passportRouter = express.Router();
//

const router = express.Router();
const {
  signupGet,
  signupPost,

} = require("../controllers/auth.controller");

//const passport = require("../config/passport");


// tema: Require User model

// tema:Signup Route

// tema:Login Route
router.get("/signup", signupGet);
router.post("/signup", signupPost);


// tema:Logout Route

// passportRouter.get("/private-page", ensureLogin, (req, res) => {
//   res.render("passport/private", {
//     user: req.user
//   });
// });

// function ensureLogin(req, res, next) {
//   return req.isAuthenticated() ? next() : res.redirect("/login")
// }

module.exports = passportRouter;