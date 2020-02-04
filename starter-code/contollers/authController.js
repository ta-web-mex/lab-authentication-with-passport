const User = require('../models/User')

exports.signupView = (req, res, next) => {
    res.render('passport/signup')
}

exports.signup = async (req, res) => {
    const {email, password} = req.body
    //checar si existe ya en DB
    const user = await User.findOne({ email }) //checa si existe el user
    if (user){
        res.render('passport/signup', {msg: 'Ya esta registrado el correo, haz log in'})
    } else {
        await User.register({email}, password)
        res.redirect('/login')
    }
}

exports.loginView = (req, res) => {
    res.render('passport/login', {msg: req.flash('error')})
}




