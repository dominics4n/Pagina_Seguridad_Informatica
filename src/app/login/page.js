'use client';

import { hashcompare } from '../encrypcosas.js';
import { esperafuncional } from '../encrypcosas.js';
import { generateAccessJWT } from '../encrypcosas.js';
import { postlogin } from '../../credenciales.js';
import { getcookies } from '../../credenciales.js';
import { eatcookies } from '../../credenciales.js';

let pruebasss = "Hola";
let token = "papu";

export async function conflog(rawdata){
    console.log("hola soy token : " + token);
    const h2objetivo = document.getElementById('registroconfirmacion');
    await hashcompare(rawdata);
    let logeado = await esperafuncional();
    console.log(logeado);
    if(logeado){
        token = await generateAccessJWT(rawdata)
        h2objetivo.innerText = "Sesion iniciada";
        console.log("hola soy token : " + token);
        await postlogin(token);
    }
    else{
        h2objetivo.innerText = "Usuario o Password incorrectos";
    }
    console.log(pruebasss);
    console.log("hola soy token : " + token);
}

export default function Home() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <form action={conflog}>
                    <div className="space-y-12">
                    
                        <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-white">Inicia Sesion</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                id="Username"
                                name="username"
                                type="text"
                                autoComplete="given-name"
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                id="Password"
                                name="password"
                                type="text"
                                autoComplete="family-name"
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                        
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">

                        <button type="submit"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        Log In
                        </button>
                    </div>

                    <div >
                        <h2 id='registroconfirmacion' className="text-base/7 font-semibold text-white">
                        
                        </h2>
                    </div>
                    
                    </form>
          </main>
        </div>
    );
}
