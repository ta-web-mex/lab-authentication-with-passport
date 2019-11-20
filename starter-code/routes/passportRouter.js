const express = require('express');
const passportRouter = express.Router();
const { signupGet, signupPost, loginGet } = require('../controllers/index.controllers');

const passport = require('../config/passport');

passportRouter.get('/signup', signupGet);

passportRouter.post('/signup', signupPost);

passportRouter.get('/login', isNotLoggedIn, loginGet);

function isNotLoggedIn(req, res, next) {
	!req.isAuthenticated() ? next() : res.redirect('/passport/private-page');
}

passportRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/passport/private-page',
		failureRedirect: '/passport/login'
	})
);

passportRouter.get('/private-page', ensureLogin, (req, res) => {
	console.log(req.user);
	res.render('passport/private', { user: req.user });
});

function ensureLogin(req, res, next) {
	console.log(req.isAuthenticated());
	return req.isAuthenticated() ? next() : res.redirect('/passport/login');
}

passportRouter.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/passport/login');
});

module.exports = passportRouter;
