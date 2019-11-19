const passport = require('passport');
const User = require('../models/User');


// We create the local strategy

passport.use(User.createStrategy());


// We serialize and deserialize the User
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  });
  
});
module.exports = passport;