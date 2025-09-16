"use server";

import { redirect, RedirectType  } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';


export async function getcookies() {
    //Recupera todas las cookies
    const cookieStore = await cookies();
    //Busca cookie que contiene el token
    let jwtoken = cookieStore.get('jwtcookie');
    //Si lo encuentra, regresa valor del token
    if(jwtoken){
        return(jwtoken.value);
    }
    return(false);
}

export async function eatcookies() {
    const cookieStore = await cookies()
    //Busca cookie que contiene el token
    const hasCookie = cookieStore.has('jwtcookie');
    //Si la encuentra, borra a la cookie
    if(hasCookie){
        cookieStore.delete('jwtcookie');
    }
    await retorno();
}
//regresa a la pagina principal
export async function retorno(){
    let url = ('/');
    redirect(url, RedirectType.push);
}