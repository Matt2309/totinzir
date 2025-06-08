"use client";
import React, {useActionState} from "react";
import {CreateReviewFormState} from "@/lib/definitions";
import {createReview} from "@/db/actions/addReview";

export default function AddReviewForm({eventId}) {
    const [state, action, pending] = useActionState<CreateReviewFormState, FormData>(createReview, undefined);

    return (
        <form action={action}>
            <input type="hidden" name="eventId" value={eventId} />
            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Titolo della Recensione
                </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Inserisci un titolo per la tua recensione"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.title && <p className="text-red-600 text-xs -mt-1">{state.errors.title}</p>}
            </div>

            <div className="mt-4">
                <label className="font-medium text-left block text-sm text-blue-gray-700">
                    Descrizione
                </label>
                <textarea
                    name="description"
                    placeholder="Raccontaci la tua esperienza..."
                    rows={4}
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md p-2 text-sm w-full"
                />
                {state?.errors?.description && <p className="text-red-600 text-xs -mt-1">{state.errors.description}</p>}
            </div>

            <div className="mt-4">
                <label className="font-medium text-left block text-sm text-blue-gray-700">
                    Stelle
                </label>
                <input
                    type="number"
                    name="stars"
                    min="1"
                    max="5"
                    placeholder="Da 1 a 5 stelle"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.stars && <p className="text-red-600 text-xs -mt-1">{state.errors.stars}</p>}
            </div>

            <div className="mt-4 flex items-center">
                <input
                    type="checkbox"
                    name="purchased"
                    id="purchased"
                    className="mr-2"
                />
                <label htmlFor="purchased" className="font-medium text-sm text-blue-gray-700">
                    Ho acquistato questo evento/esperienza
                </label>
            </div>
            {state?.errors?.purchased && <p className="text-red-600 text-xs mt-1">{state.errors.purchased}</p>}

            <button
                type="submit"
                className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer"
                disabled={pending}
            >
                {pending ? 'Invio...' : 'Invia Recensione'}
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs mt-1">{state.errors.genericerror}</p>}
        </form>
    );
}