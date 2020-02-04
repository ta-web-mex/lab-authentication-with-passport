const express        = require("express");
const passportRouter = express.Router();

//Creamos una constate la cual almacenara el passport del config que sera mandado a requerir

const passport = require('../config/passport');

//Recordemos que cada que queremos agregar una ruta debemos de crear una constante con el nombde
//De la que se llamara con el metodo post o get
//Estas puden estar ya creadas o mandarlas a llamar y despues crrearlas
//NOTA: tenemos que mmm no recuerdo el nombre pero va entre  { }
const {   signupView, signupPost, loginView, logout  } = require("../controllers/index")

// Require User model

// Signup Route
//Primero creamos dos rutas las cuales seran del singup
//Una que muestra solo el sing con el metodo get y una donde 
//Se mostrara la vista con el formulario con el metodo post el cual
//Sera enviado a nuestros demas pasos para crerarlo

passportRouter.get("/singup",signupView)
passportRouter.post("/singup",signupPost)


// Login Route COmo su nombre lo dice es la ruta del loigin
//dE igual forma debemos de crear dos ,una que sera la ruta con el metodo get
//y la otra que tengra el metodo post el cual tendremos cque revisar la autentificacion
//Si esta se cumple nos tendra que redirigir a la pgina privada y sino nos mandara al login como lo hizo joss
passportRouter.get("/login",loginView)

passportRouter.post("login",passport.authenticate("local", {
//Parametros dados por la libreria los cuales nada mas sustituoimos los valores
//Con este caso el de si se cumple el privarte y sino al login 1
  successRedirect: "/private-page",
  failureRedirect: "/login",
  failureFlash: true

}))


// Logout Route simplmente la ruta como lo menciona mata la session o beno la termina
passportRouter.get("/logout", logout)

passportRouter.get("/private-page", ensureLogin, (req, res) => {
  res.render("passport/private", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

module.exports = passportRouter;
