"use server";

import { NewUser } from './mongoActions.js';
import { CheckUser } from './mongoActions.js';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const secretos = process.env.JWT_KEY;

//Hasheo pre nuevo usuario
export async function hashwrite(rawformdata) {
    console.log("llamo a checkuser");
    let existe = await CheckUser(rawformdata.get("username"));
    console.log("sali de checkuser");
    // Si encontro al usuario en la DB
    if(!existe){
        console.log("user existe, quiero bcrypt");
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        //Plain Password del form
        console.log("recupero password");
        let plainpassword = rawformdata.get("password");
        let rol = false;
        let userdata;
        console.log("es admin?");
        if(rawformdata.get("Admin")){
            console.log("si");
            rol = true;
        }
        //Hasheofuncion
        console.log("encripto cosas");
        bcrypt.hash(plainpassword, saltRounds, function(err, hash){
            //Objeto userdata por subir a DB
                userdata = {
                Username: rawformdata.get("username"),
                Password: hash,
                Admin: rol,
            }
            //Llama funcion de escritura a DB
            console.log("llamo a newuser");
            NewUser(userdata);
        });
        return(true);
    }
    else{
        console.log("usuario no existe");
        return(false);
    }
    
}

let validacion;
let roles;

//Comprobacion de password con hash de DB
export async function hashcompare(rawformdata) {
    console.log("requiero bcrypt");
    const bcrypt = require('bcrypt');
    //Recuperacion de informacion de usuario de la DB
    console.log("llamo a checkuser");
    let posthasheo = await CheckUser(rawformdata.get("username"));
    console.log("existe user?");
    if(posthasheo)
    {
        console.log("si");
        //Revisa si el usuario tiene privilegios de administrador
        if(posthasheo.Admin){
            roles = "admin"
        }
        else{
            roles = "usuario"
        }
        //Recuperacion de password plana del form
        console.log("dame password");
        let plainpassword = rawformdata.get("password");
        //Comparacion de password plana con hash de DB
        console.log("voy a comparar");
        bcrypt.compare(plainpassword, posthasheo.Password, function(err, result) {
        validacion = result;
        });
        console.log("compare y salio algo idk");
    }

}
//Espera implementada para que mis funciones dejen de entregar promesas en su return
export async function esperafuncional(){
    console.log("estoy en esoera funcional");
    setTimeout(function(){
    console.log("Executed after 1 second");
    }, 1000);
    console.log("retorno validacion");
    return(validacion);
}

export async function generateAccessJWT(dataforms){
    // define variable a encapsular en el token
    console.log("voy a generar token pro");
    const payload = 
    {
        id: dataforms.get("username"),
        rol: roles,
    };
    // Creacion del token, expirara en 656 minutos
    console.log("genero token pro");
    let jwtoken = jwt.sign(payload, secretos, {expiresIn: '656m',});
    console.log("recupero cookies");
    const cookieStore = await cookies();
    // Creacion de la cookie con el token, expirara en 656 minutos
    console.log("cocino galletas cool");
    cookieStore.set('jwtcookie', jwtoken, {maxAge: 39360});
    console.log("te regalo token");
    return(jwtoken);
}
