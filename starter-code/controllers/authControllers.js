const User= require("../models/User")
//const passport = require("../config/passport");

exports.signUpView=(req,res,next)=>{
res.render("passport/signup");
}

exports.signUpPost= async (req,res,next)=>{
  const {email,password}=req.body;
 
  const userOnDB=await User.findOne({email});
 if(userOnDB!==null){
   res.render("passport/signup",{message:"the email already exists"})
 }else{
await User.register({email},password);
res.redirect("/login");
 }
 
 }
 exports.logInView= (req,res,next)=>{
   res.render("passport/login");
 }

 exports.privateView=(req, res,next) => {
  res.render("passport/private", { user: req.user });
}
/*
 exports.logInPost=()=>{
  passport.authenticate("local",{
    successRedirect:"/private",
    failureRedirect:"/login",
    failureFlash:true,
    successFlash:'Welcome!'
  })

 }
*/
