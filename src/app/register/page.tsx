'use client'
import Image from "next/image";
import Link from "next/link";
import {useActionState} from "react";
import {signUp} from "@/db/actions/auth";

export default function register() {
    const [state, action, pending] = useActionState(signUp, undefined)
    return (
    <div>
        <main className="flex flex-col items-center">
            <div className="grid grid-cols-2 bg-white w-4/6 my-30 rounded-3xl">
                <div className="p-10">
                    <Link href="/" className="pointer-events-auto">
                        <Image src="/logo_totinzir.svg" alt="header logo" width={70} height={40}></Image>
                    </Link>
                    <br/>
                    <h1 className="text-4xl">REGISTRAZIONE</h1>
                    <form className="mt-4 flex flex-col gap-2" action={action}>
                        <div className="flex flex-row gap-5">
                            <div className="mb-1 flex-1">
                                <label htmlFor="name" className="block mb-1 text-sm">NOME</label>
                                <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" placeholder="Nome" type="text" name="firstname" aria-label="firstname"/>
                                {state?.errors?.firstname && <p className="text-red-600 text-xs ">{state.errors.firstname}</p>}
                            </div>
                            <div className="mb-1 flex-1">
                                <label htmlFor="name" className="block mb-1 text-sm">COGNOME</label>
                                <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" placeholder="Cognome" type="text" name="lastname" aria-label="lastname"/>
                                {state?.errors?.lastname && <p className="text-red-600 text-xs ">{state.errors.lastname}</p>}
                            </div>
                        </div>
                        <div className="flex flex-row gap-5">
                            <div className="mb-1 flex-1">
                                <label htmlFor="name" className="block mb-1 text-sm">TELEFONO</label>
                                <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" placeholder="123-456-7890" type="text" name="phone" aria-label="phone"/>
                                {state?.errors?.phone && <p className="text-red-600 text-xs ">{state.errors.phone}</p>}
                            </div>
                            <div className="mb-1 w-1/4">
                                <label htmlFor="name" className="block mb-1 text-sm">età</label>
                                <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" placeholder="18" type="number" name="age" aria-label="age"/>
                                {state?.errors?.age && <p className="text-red-600 text-xs ">{state.errors.age}</p>}
                            </div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="name" className="block mb-1 text-sm">codice fiscale</label>
                            <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" placeholder="ABCABC04A12Z140T" type="text" name="fc" aria-label="taxcode"/>
                            {state?.errors?.fc && <p className="text-red-600 text-xs">{state.errors.fc}</p>}
                        </div>
                        <div className="mb-1">
                            <label htmlFor="name" className="block mb-1 text-sm">EMAIL</label>
                            <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" placeholder="mario.rossi@email.com" type="text" name="email" aria-label="email"/>
                            {state?.errors?.email && <p className="text-red-600 text-xs ">{state.errors.email}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-1 text-sm">PASSWORD</label>
                            <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" placeholder="password" type="password" name="password" aria-label="password"/>
                            {state?.errors?.password && <p className="text-red-600 text-xs ">{state.errors.password}</p>}
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="policy-radio-1" type="radio" value="ts" name="policy" className="w-4 h-4 text-[light-dark(var(--button_blue),var(--button_blue))] bg-[light-dark(var(--button_blue),var(--button_blue))] border-[light-dark(var(--button_blue),var(--button_blue))] focus:ring-[light-dark(var(--button_blue),var(--button_blue))] focus:ring-2"/>
                            <label htmlFor="policy-radio-1" className="ms-2 text-sm font-medium text-gray-900">Accetta l'informativa sulla privacy</label>
                        </div>
                        {state?.errors?.policy && <p className="text-red-600 text-xs -mt-4 mb-1">{state.errors.policy}</p>}

                        <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] font-bold py-1 px-10 rounded-md text-white text-sm w-3/8">REGISTRATI</button>
                        {state?.errors?.genericerror && <p className="text-red-600 text-xs">{state.errors.genericerror}</p>}

                    </form>
                </div>
                <div className="overflow-hidden relative rounded-r-3xl">
                    <Image
                        src="/landing_background.jpeg"
                        alt="header logo"
                        width={500}
                        height={69}
                        className="w-full h-full object-cover transform scale-130 -translate-y-20 -translate-x-15"
                    />
                </div>
            </div>
        </main>
    </div>
  );
}