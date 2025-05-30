"use client";
import React, {useActionState} from "react";
import {upgradeToOrganizer} from "@/db/actions/upgradeToOrganizer";

export default function CreateOrganizerForm() {
    const [state, action, pending] = useActionState(upgradeToOrganizer, undefined)

    return (
        <form action={action}>
            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Email utente
                </label>
                <input type="text" name="email" placeholder="user@gmail.com"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.email && <p className="text-red-600 text-xs -mt-1">{state.errors.email}</p>}
            </div>

            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Ragione sociale
                </label>
                <input type="text" name="companyName" placeholder="Inserisci la ragione sociale"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.companyName && <p className="text-red-600 text-xs -mt-1">{state.errors.companyName}</p>}
            </div>

            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Partita IVA
                </label>
                <input type="text" name="vatNumber" placeholder="1234567 890 1"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.vatNumber && <p className="text-red-600 text-xs -mt-1">{state.errors.vatNumber}</p>}
            </div>

            <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer">
                Crea organizzatore
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs -mt-1">{state.errors.genericerror}</p>}
        </form>

    );
}