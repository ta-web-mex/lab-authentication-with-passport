const User = require('../models/User');

//Signup controller
exports.signupView = (req, res) => {
    res.render('passport/signup');
};

exports.signup = async(req, res) => {
    const { name, email, password } = req.body;

    if (email === '' || password === '') {
        res.render('passport/signup');
    }

    const userOnDb = await User.findOne({ email });
    if (userOnDb !== null) {
        res.render('passport/signup');
    }

    await User.register({ name, email }, password);
    res.redirect('/login');
}

//Login controllers
exports.loginView = (req, res) => {
    res.render('passport/login')
}

//Logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}