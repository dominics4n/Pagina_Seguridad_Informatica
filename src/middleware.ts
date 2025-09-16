import { NextResponse } from "next/server";
import { getcookies } from "./credenciales";
import type { NextRequest } from "next/server";
import { verifcacionjwt } from "./jwtverification"

export function middleware(request: NextRequest){


  let rol = "";
  const url = request.nextUrl.clone();
  const jwtoken = request.cookies.get("jwtcookie");
  // Revisa si se encontro un token de inicio de sesion
  if(jwtoken){
    let decoded = verifcacionjwt(jwtoken.value);
    //Si el token fue valido, extrae valor "rol"
    if(decoded){
      rol = decoded["rol"];
    }
  }
  
  if(url.pathname === '/'){
    if(rol === "admin"){
      url.pathname = '/Adminpage';
      return NextResponse.rewrite(url);
    }
    if(rol === "usuario"){
      url.pathname = '/Userpage';
      return NextResponse.rewrite(url);
    }
    else{
      return NextResponse.next();
    }
  }

  if(url.pathname === '/Adminpage'){
    if(rol === "admin"){
      return NextResponse.next();
    }
    else{
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/Userpage'){
    if(rol === "usuario"){
      return NextResponse.next();
    }
    else{
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/signupadmin'){
    if(rol === "admin"){
      return NextResponse.next();
    }
    else{
      url.pathname = '/signup';
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/signup'){
    if(rol === "admin"){
      url.pathname = '/signupadmin';
      return NextResponse.redirect(url);
    }
    else{
      return NextResponse.next();
    }
  }

}

export const config = {
  // Permite realizar las acciones de desencriptado dentro del middleware
  runtime: 'nodejs',
};