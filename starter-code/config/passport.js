const passport = require("passport")
const User = require("../models/User")

//Creating the local strategy:
passport.use(User.createStrategy())

// I still don't manage to understand quite well what does
//serializeUser and deserializeUser do.
// I only understand that they are required for our local strategy to work
// By the notes in the excercise done in the morning, I get that
// serialize takes the id of the specific user, deserialize searches
// for it in our database and if it is found, the authentication process completes,
// if not, the auth process does not pass.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport

