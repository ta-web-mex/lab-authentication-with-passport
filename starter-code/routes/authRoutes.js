const { Router } = require("express")
const passport = require("../config/passport")
const router = Router();

const {

  signupView,
  signup,
  loginView,
  logout

} = require("../controllers/authControllers.js")

router.get ("/singup",signupView);
router.post("/singup",signup)
router.get("/login",loginView)


router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  );


//Google auth Routes


router.get("/auth/google", passport.authenticate("google",{
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ] 
}))

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  );

router.get("/logout", logout);

module.exports = router;