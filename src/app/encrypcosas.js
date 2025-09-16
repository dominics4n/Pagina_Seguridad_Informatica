"use server";

import { NewUser } from './mongoActions.js';
import { CheckUser } from './mongoActions.js';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const secretos = process.env.JWT_KEY;

//Hasheo pre nuevo usuario
export async function hashwrite(rawformdata) {
    let existe = await CheckUser(rawformdata.get("username"));
    // Si encontro al usuario en la DB
    if(!existe){
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        //Plain Password del form
        let plainpassword = rawformdata.get("password");
        let rol = false;
        let userdata;
        if(rawformdata.get("Admin")){
            rol = true;
        }
        //Hasheofuncion
        bcrypt.hash(plainpassword, saltRounds, function(err, hash){
            //Objeto userdata por subir a DB
                userdata = {
                Username: rawformdata.get("username"),
                Password: hash,
                Admin: rol,
            }
            //Llama funcion de escritura a DB
            NewUser(userdata);
        });
        return(true);
    }
    else{
        return(false);
    }
    
}

let validacion;
let roles;

//Comprobacion de password con hash de DB
export async function hashcompare(rawformdata) {
    const bcrypt = require('bcrypt');
    //Recuperacion de informacion de usuario de la DB
    let posthasheo = await CheckUser(rawformdata.get("username"));

    if(posthasheo)
    {
        //Revisa si el usuario tiene privilegios de administrador
        if(posthasheo.Admin){
            roles = "admin"
        }
        else{
            roles = "usuario"
        }
        //Recuperacion de password plana del form
        let plainpassword = rawformdata.get("password");
        //Comparacion de password plana con hash de DB
        bcrypt.compare(plainpassword, posthasheo.Password, function(err, result) {
        validacion = result;
        });
    }

}
//Espera implementada para que mis funciones dejen de entregar promesas en su return
export async function esperafuncional(){
    setTimeout(function(){
    console.log("Executed after 1 second");
    }, 1000);
    return(validacion);
}

export async function generateAccessJWT(dataforms){
    // define variable a encapsular en el token
    const payload = 
    {
        id: dataforms.get("username"),
        rol: roles,
    };
    // Creacion del token, expirara en 656 minutos
    let jwtoken = jwt.sign(payload, secretos, {expiresIn: '656m',});
    const cookieStore = await cookies();
    // Creacion de la cookie con el token, expirara en 656 minutos
    cookieStore.set('jwtcookie', jwtoken, {maxAge: 39360});
    return(jwtoken);
}
