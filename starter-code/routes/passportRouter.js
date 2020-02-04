const express = require("express");
const passportRouter = express.Router();
const { signupView, signup, loginView, logout } = require('../controllers/authControllers');
const passport = require('../config/passport');
// Require User model
const { User } = require('../models/User');

// Signup Route
passportRouter.get('/signup', signupView);
passportRouter.post('/signup', signup);

// Login Route
passportRouter.get('/login', loginView);
passportRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/private-page',
    failureRedirect: '/login'
}));


const ensureLogin = (req, res, next) => {
    return req.isAuthenticated() ? next() : res.redirect("/login")
}

//Private Rooute
passportRouter.get('/private-page', ensureLogin, (req, res) => {
    res.render('passport/private', { user: req.user });
});


// Logout Route
passportRouter.get('/logout', logout);


module.exports = passportRouter;