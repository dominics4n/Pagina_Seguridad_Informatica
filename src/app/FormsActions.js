'use user';

import { hashcompare } from './encrypcosas.js';
import { hashwrite } from './encrypcosas.js';
import { esperafuncional } from './encrypcosas.js';
import { generateAccessJWT } from './encrypcosas.js';
import { retorno } from '../credenciales.js';

export async function conflog(rawdata){
    const h2objetivo = document.getElementById('registroconfirmacion');
    //llama funcion de validacion
    await hashcompare(rawdata);
    let logeado = await esperafuncional();
    // Si se valido con exito
    if(logeado){
        await generateAccessJWT(rawdata)
        h2objetivo.innerText = "Sesion iniciada";
        await retorno();
    }
    else{
        h2objetivo.innerText = "Usuario o Password incorrectos";
    }
}

export async function nuevoregistro(rawdata){
    const h2objetivo = document.getElementById('signupconfirmacion');
    let signin = await hashwrite(rawdata);
    if(signin){
        h2objetivo.innerText = "Registro Exitoso";
        await retorno();
    }
    else{
        h2objetivo.innerText = "El usuario ya existe";
    }
}