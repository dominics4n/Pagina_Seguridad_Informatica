import { NextResponse } from "next/server";
import { getcookies } from "./credenciales";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
  const url = request.nextUrl.clone()
  const ayuda = request.cookies.get("jwtoken")
  if(url.pathname === '/'){
    if(!ayuda){
      return NextResponse.next();
    }
    if(ayuda.value === "admin"){
      url.pathname = '/Adminpage';
      return NextResponse.rewrite(url);
    }
    else{
      url.pathname = '/Userpage';
      return NextResponse.rewrite(url);
    }
  }

  if(url.pathname === '/Adminpage'){
    if(!ayuda){
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    if(ayuda.value = "admin"){
      return NextResponse.next();
    }
    else{
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/Userpage'){
    if(!ayuda){
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    if(ayuda.value = "admin"){
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    else{
      return NextResponse.next();
    }
  }

  if(url.pathname === '/signupadmin'){
    if(!ayuda){
      url.pathname = '/signup';
      return NextResponse.redirect(url);
    }
    if(ayuda.value == "admin"){
      return NextResponse.next();
    }
    else{
      url.pathname = '/signup';
      return NextResponse.redirect(url);
    }
  }

  if(url.pathname === '/signup'){
    if(!ayuda){
      url.pathname = '/signup';
      return NextResponse.next();
    }
    if(ayuda.value == "admin"){
      url.pathname = '/signupadmin';
      return NextResponse.redirect(url);
    }
    else{
      return NextResponse.next();
    }
  }

}
/*
export const config = {
  matcher: ['/'],
};*/