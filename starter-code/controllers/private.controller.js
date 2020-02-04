exports.private = (req,res) => {
    res.render('passport/private', {user: req.user})
}