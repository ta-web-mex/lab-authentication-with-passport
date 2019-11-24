require("dotenv").config();

const User = require("../models/User");

exports.signupGet = (_, res) => res.render("passport/signup");

exports.signupPost = (req, res, next) => {
    const { name, email, password, passwordrepeat, role} = req.body;
    if (password !== passwordrepeat) {
        return res.render("passport/signup", {
            msg: "Passwords must be the same"
        });
    }
    User.register({ name, email, role }, password)
        .then(user => res.redirect("/login"))
        .catch(err => {
            if(err.name === "UserExistsError") {
                return res.render("passport/signup", {
                    msg: "Mail already registered"
                });
            }
        });
};

exports.loginGet = (req, res) => {
    res.render("passport/login", { msg: req.flash("error") });
};

exports.profileGet = (req, res) => {
    res.render("passport/private", {user: req.user });
}