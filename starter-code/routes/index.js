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

//signup
router.get("/signup", signupGet);
router.post("/signup", signupPost);

//login MLP
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



//aquien pertenece?
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("hey!");
      return next(err);
    }
    if (!user) {
      console.log("qué onda!?");
      return res.redirect("/login");
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      console.log(req.user);
      return res.redirect(`/${String(user.role).toLowerCase()}`); //en la ruta aparece en lowercase
    });
  })(req, res, next);
});

router.get("/profile", isLoggedIn, profileGet);

router.get(
  "/mastermind",
  isLoggedIn,
  checkRole("MASTERMIND"),
  (req, res, next) => {
    res.send("bienvenido");
  }
);

router.get("/user", isLoggedIn, checkRole("USER"), (req,res,next) => {
  res.send("hey!");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});


module.exports = router;
