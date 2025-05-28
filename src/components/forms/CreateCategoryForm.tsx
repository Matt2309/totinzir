"use client";
import React, {useActionState} from "react";
import {createCategory} from "@/db/actions/createCategory";

export default function CreateCategoryForm() {
    const [state, action, pending] = useActionState(createCategory, undefined)

    return (
        <form action={action}>
            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Titolo
                </label>
                <input type="text" name="title" placeholder="Inserisci il titolo dell'evento"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.title && <p className="text-red-600 text-xs -mt-1">{state.errors.title}</p>}
            </div>

            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Durata
                </label>
                <input type="number" name="duration" placeholder="Es. 20 (minuti)"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.duration && <p className="text-red-600 text-xs -mt-1">{state.errors.duration}</p>}
            </div>

            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Difficoltà
                </label>
                <input type="text" name="difficulty" placeholder="Es. Facile"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.difficulty && <p className="text-red-600 text-xs -mt-1">{state.errors.difficulty}</p>}
            </div>
            <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer">
                Crea categoria
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs -mt-1">{state.errors.genericerror}</p>}
        </form>

    );
}