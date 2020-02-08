const router = require('express').Router();
const passport = require('../config/passport')
const User = require('../models/User')

/* GET home page */
console.log(passport+'estoy en routes');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req,res,next)=>{
  res.render('passport/signup')
})

router.get('/login',(req,res)=> {
  res.render('passport/login', {message: 'El correo '})
})
router.post(
  '/login',
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  })
)

router.post('/signup', (req,res,next)=> {


  const {name,email,password}= req.body
  if(email ===''|| password ===''||name ===''){
    return res.render("passport/signup", {mensaje: "El ususario y/o ya esta registrado"})
  }


User.findOne({email})
      .then(user=> {
        if (user !== null){
          return res.render('passport/signup')
        }
      }).catch(error => {
        next(error)
      })


      User.register({email,name}, password)
      .then(userCreated =>{
        console.log(userCreated)
        res.redirect('/login')
      })
      .catch(error=> {
        next(error)
      })


})

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/login')
})


module.exports = router
