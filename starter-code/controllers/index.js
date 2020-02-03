const User = require('../models/User');


exports.signupView = (req, res) => {
    res.render('views/signup')
}

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;

    if (email === "" || password === "") {
        res.render('view/signup', {
            message: 'Campos incompletos'
        })
    }
}

