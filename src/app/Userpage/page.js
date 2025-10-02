'use client';
import Image from "next/image";
import { eatcookies } from "../../credenciales";

export function botonlog(){
    // console.log("adios");
    eatcookies();
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          src="/mikuleek.gif"
          alt="mikuleek"
          width={275}
          height={200}
          priority
          unoptimized
        />
        <h2>Usuario</h2>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Que hace un usuario?
            .
          </li>
          <li className="tracking-[-.01em]">
            Usa
          </li>
          <li className="tracking-[-.01em]">
            Tiene menos poder que un admin
          </li>
          <li className="tracking-[-.01em]">
            Cool
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button onClick={botonlog}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Log Out
          </button>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/signup"
            rel="noopener noreferrer"
          >
            Sign Up
          </a>
        </div>
      </main>
    </div>
  );
}
