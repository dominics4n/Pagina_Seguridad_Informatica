"use server";

import { redirect, RedirectType  } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';


export async function getcookies() {
    console.log("hola soy cookis");
    let verificacion
    let tokenfinal
    const cookieStore = await cookies();
    let jwtoken = cookieStore.get('jwtcookie');
    if(jwtoken){
        console.log("hola soy tokeb" + JSON.stringify(jwtoken.value));
        return(jwtoken.value);
    }
    return(false);
}

export async function eatcookies() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('jwtcookie')
    if(hasCookie){
        console.log("voy a comer galletas " + hasCookie);
        cookieStore.delete('jwtcookie');
    }
    let url = ('/');
    console.log("hola soy url" + url);
    redirect(url, RedirectType.push);
}

export async function postlogin(token){
    let tokenraw = await getcookies();

    let url = ('/');
    console.log("hola soy url" + url);
    redirect(url, RedirectType.push);
}

export async function postsignin(){
    let url = ('/');
    console.log("hola soy url" + url);
    redirect(url, RedirectType.push);
}