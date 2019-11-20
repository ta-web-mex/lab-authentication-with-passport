require('dotenv').config();

const User = require('../models/User');

exports.signupGet = (req, res) => res.render('passport/signup');

exports.signupPost = (req, res, next) => {
	const { email, password, passwordrepeat } = req.body;
	if (password !== passwordrepeat) {
		return res.render('passport/signup', {
			Message: 'Passwords must be the same'
		});
	}

	User.register({ email }, password).then((user) => res.redirect('/passport/login')).catch((err) => {
		if (err.name === 'UserExistsError') {
			return res.render('passport/signup', {
				Message: 'Email already exists'
			});
		}
	});
};

exports.loginGet = (req, res) => {
	res.render('passport/login', { Message: 'Error' });
};
