exports.ensureLogin = async (req,res,next) => {
  return req.isAuthenticated() ? next() : res.redirect('/logIn')
}