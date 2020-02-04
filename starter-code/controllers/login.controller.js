const User = require('../models/User')

exports.loginView = async (rq, rs, nxt) => {
    rs.render('passport/login', {message: rq.flash('error')})
}

exports.signupView = async (rq, rs, nxt) => {
    rs.render('passport/signup')
}

exports.signUpPost = async (rq,rs,nxt) => {
    const {email,password} = rq.body

    if(email === '' || password === ''){
        rs.render('passport/signup', {message: 'Please fill the camps!!'})
    }

    const userOnDB = await User.findOne({email})
    if(userOnDB !== null){
        rs.render('passport/signup', {message: 'The Email is already registered'})
    }

    await User.register({email}, password)
    rs.redirect('/logIn')
}

exports.logOut = (rq, rs) => {
    rq.logout()
    rs.redirect('passport/login')
}