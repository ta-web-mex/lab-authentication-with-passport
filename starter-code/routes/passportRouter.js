// const express        = require("express");
// const passportRouter = express.Router();
const router = require("express").Router();

// passportRouter.get("/private-page", ensureLogin, (req, res) => {
//   res.render("passport/private", { user: req.user });
// });

// function ensureLogin(req, res, next) {
//   return req.isAuthenticated() ? next() : res.redirect("/login")
// }


router.get("/", (req, res) => res.send("Es el nombrede user"));
router.get("/amigos", (req, res) => res.send("amigos user"));



module.exports = router;
