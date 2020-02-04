//Mandamos a llamar al Usuaro del modelo
const User = require('../models/User')

//Pasamos a exportar la vista del sinup es decir el el view singup
//Recordemos que cuando se exporta aun no estra crerado entonces debemos de
//Crearlo mas adelante para que funcione, ya que este es el paso
exports.singupView = ( req, res, next) =>{
    res.render("passport/singup")
}


exports.singupPost = async (req, res ,next) => {
    //Creamos una constante la cual tomara los valores con el req body
    const {email, password} = req.body

//Recordando lo que dijo joss se puede hacer mas robusto el codigo apra que podamos pedir mas cosas o que se cumplan cietos criteros 
//Al momento de ingresar los datos 
//Como duda me intriga saber como le hacen para que cuando meten un correo temporal en una app
//Algunas paginas no lo dejan acceder por el tipo de correo que es

    if(email === "" || password === ""){
        res.render("passport/singup",{
            message : "Alguno de los campos solicitado esta vacio"
        })
    }

//Ahora toca revisar si los datos ingresados ya se encuientran
//almacenados en nuestra base de datos en este caso sera buscado con el email1
const useroonDB = await User.findOne({email})
//Recuerdo esta parte pero no recuerdo como dijo jose que era
//Si era el userdb es igual a nulo o diferente a nulo osea que si se encuentra ya    

if(useroonDB !== null){
    res.render("passport/singup",{message:"El correo que ingresaste ya se encuentra registrado"})

}
//resgister uno de los metodos vistos elgual hace que se registe al usuario
//solo con el email y la contraseña recordando la contraeña se encripta gracias a los paquetes descargados
    await User.register({email},password)
    
//Una ves registrado que nos redirija al login para poder ingresar ahora si    
    res.redirect("/login")
}

//Aqui creamos la vista del login, recordemos que se crea o si ya estra creada de la carpta vistas tenemos que mandarla a llamar
//Ademas de que estas constantes son llamadas del passportRouter o bueno las que nombramos ahi

exports.loginView = (req , res , netx) =>{
    res.render("passport/login",{message: req.flash("error")})
}

//Aqui creamos es logout el cual es muy facoñ de hacer por lo mismo de los apquetes
//Este cierra la session para que no permanezca abierta yu pueda ingresar otra persona


exports.logout = (req, res , next) => {
    req.logout()
    res.redirect("/login")
}
















