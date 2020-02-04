const express        = require("express");
const passportRouter = express.Router();
const passport = require('../config/passport')

const {
  loginView,
  signupView,
  signUpPost,
  logOut
} = require('../controllers/login.controllers')

passportRouter.get('/logIn', loginView)
passportRouter.post('/logIn', 
    passport.authenticate('local', {
      successRedirect: '/private',
      failureRedirect: '/logIn',
      failureFlash: true
    })
  )
passportRouter.get('/signUp', signupView)
passportRouter.post('/signUp', signUpPost)
passportRouter.get('/logOut', logOut)


module.exports = passportRouter;
// passportRouter.get("/private-page", ensureLogin, (req, res) => {
//   res.render("passport/private", { user: req.user });
// });

