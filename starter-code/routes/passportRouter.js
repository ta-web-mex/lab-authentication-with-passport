// const express        = require("express");
// const passportRouter = express.Router();


// Require User model

// Signup Route

// Login Route

// Logout Route

// passportRouter.get("/private-page", ensureLogin, (req, res) => {
//   res.render("passport/private", { user: req.user });
// });

// function ensureLogin(req, res, next) {
//   return req.isAuthenticated() ? next() : res.redirect("/login")
// }

// module.exports = passportRouter;

const router = require("express").Router();

router.get("/", (req, res) => res.send("User Home"));

router.get("/amigos", (req, res) => res.send("este es el amigos del user"));

module.exports = router;

