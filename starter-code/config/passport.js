const passport= require('passport')
const User =require('../models/User')

passport.use(User.createStrategy()); //passport local strategy

//Si solo hay una estrategia tambien podemos poner:
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Serializar usuario
passport.serializeUser(function(user, done) {
  //Mantenemos en contexto el id de nuestro usuario.
  done(null, user.id);
});

//Deserializamos usuario
passport.deserializeUser(function(id, done) {
  // A partir del id que obtuvimos con serializar
  //Extraemos el usuario de la db
  User.findById(id, function(err, user) {
    done(err, user); // colocamos a este usuario en req.user
  });
});


module.exports = passport;