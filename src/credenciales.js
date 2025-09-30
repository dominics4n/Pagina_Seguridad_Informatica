"use server";

import { redirect, RedirectType  } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';


export async function getcookies() {
    console.log("hola soy getcookies");
    //Recupera todas las cookies
    console.log("busco cookies");
    const cookieStore = await cookies();
    //Busca cookie que contiene el token
    console.log("tengo cookies, busco una en especifico");
    let jwtoken = cookieStore.get('jwtcookie');
    console.log("termine de buscar cookies");
    //Si lo encuentra, regresa valor del token
    if(jwtoken){
        return(jwtoken.value);
    }
    return(false);
}

export async function eatcookies() {
    console.log("hola soy eatcookies");
    const cookieStore = await cookies()
    console.log("busque cookies");
    //Busca cookie que contiene el token
    const hasCookie = cookieStore.has('jwtcookie');
    console.log("busque una en especifico idk");
    //Si la encuentra, borra a la cookie
    if(hasCookie){
        cookieStore.delete('jwtcookie');
    }
    await retorno();
}
//regresa a la pagina principal
export async function retorno(){
    console.log("hola te voy a retornar");
    let url = ('/');
    console.log("bye");
    redirect(url, RedirectType.push);
}