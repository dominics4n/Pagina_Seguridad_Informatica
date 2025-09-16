"use server";

import { NewUser } from './mongoActions.js';
import { CheckUser } from './mongoActions.js';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const secretos = process.env.JWT_KEY;

//Hasheo pre nuevo usuario
export async function hashwrite(rawformdata) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    //Plain Password del form
    let plainpassword = rawformdata.get("password");
    let rol = false;
    if(rawformdata.get("Admin")){
        rol = true;
    }
    console.log("Password sin hash es: " + plainpassword)
    //Hasheofuncion
    bcrypt.hash(plainpassword, saltRounds, function(err, hash){
        //Objeto User por subir a DB
        let userdata = {
            Username: rawformdata.get("username"),
            Password: hash,
            Admin: rol,
        }
        //Llama funcion de escritura a DB
        NewUser(userdata);
    });
    
}
let validacion;
let roles;
//Comprobacion de password con hash de DB
export async function hashcompare(rawformdata) {
    const bcrypt = require('bcrypt');
    //Recuperacion de hash de la DB
    let posthasheo = await CheckUser(rawformdata.get("username"));
    console.log("hola soy posthasheo" + JSON.stringify(posthasheo));
    //Recuperacion de password plana del form
    if(posthasheo)
    {
        if(posthasheo.Admin){
            roles = "admin"
        }
        else{
            roles = "usuario"
        }
        let plainpassword = rawformdata.get("password");
    //Comparacion de password plana con hash de DB
        bcrypt.compare(plainpassword, posthasheo.Password, function(err, result) {
        validacion = result;
        console.log(validacion);
        });
    }

}

export async function esperafuncional(){
    setTimeout(function(){
    console.log("Executed after 1 second");
    }, 1000);
    return(validacion);
}

export async function generateAccessJWT(dataforms){
    const payload = 
    {
        id: dataforms.get("username"),
        rol: roles,
    };
    console.log("hola soy "+ dataforms.get("username") + " y mi admin es " + roles)
    /* Sign token */
    let jwtoken = jwt.sign(payload, secretos, {expiresIn: '1m',});
    const cookieStore = await cookies();
    cookieStore.set('jwtcookie', jwtoken, {maxAge: 3000});
    return(jwtoken);
    
}
