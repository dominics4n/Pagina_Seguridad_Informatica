import { NextResponse } from "next/server";
import { getcookies } from "./credenciales";
import type { NextRequest } from "next/server";
import { verifcacionjwt } from "./jwtverification"

export function middleware(request: NextRequest){
  console.log("soy tu middleware mucho gusto");
  let rol = "";
  console.log("quiero tu url");
  const url = request.nextUrl.clone();
  console.log("quiero tu token");
  const jwtoken = request.cookies.get("jwtcookie");
  // Revisa si se encontro un token de inicio de sesion
  console.log("te voy a verificar si tienes token");
  if(jwtoken){
    let decoded = verifcacionjwt(jwtoken.value);
    console.log("verificado pa");
    //Si el token fue valido, extrae valor "rol"
    if(decoded){
      rol = decoded["rol"];
    }
  }
  console.log("voy a decidir a donde te mando");
  if(url.pathname === '/'){
    if(rol === "admin"){
      url.pathname = '/Adminpage';
      console.log("rewrite");
      return NextResponse.rewrite(url);
    }
    if(rol === "usuario"){
      url.pathname = '/Userpage';
      console.log("rewrite");
      return NextResponse.rewrite(url);
    }
    else{
      console.log("next");
      return NextResponse.next();
    }
  }

  if(url.pathname === '/Adminpage'){
    if(rol === "admin"){
      console.log("next");
      return NextResponse.next();
    }
    else{
      url.pathname = '/';
      console.log("redirect");
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/Userpage'){
    if(rol === "usuario"){
      console.log("next");
      return NextResponse.next();
    }
    else{
      url.pathname = '/';
      console.log("redirect");
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/signupadmin'){
    if(rol === "admin"){
      console.log("next");
      return NextResponse.next();
    }
    else{
      url.pathname = '/signup';
      console.log("redirect");
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/signup'){
    if(rol === "admin"){
      url.pathname = '/signupadmin';
      console.log("redirect");
      return NextResponse.redirect(url);
    }
    else{
      console.log("next");
      return NextResponse.next();
    }
  }

}

export const config = {
  // Permite realizar las acciones de desencriptado dentro del middleware
  runtime: 'nodejs',
};