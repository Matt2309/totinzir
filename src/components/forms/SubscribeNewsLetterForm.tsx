'use client';

import { useActionState } from 'react';
import {subscribeNewsletter} from "@/db/actions/subscribeNewsLetter";
import {SubscribeNewsletterFormState} from "@/lib/definitions";

export default function SubscribeNewsletterForm({eventId}) {
    const [state, action, pending] = useActionState<SubscribeNewsletterFormState, FormData>(subscribeNewsletter, undefined);

    return (
        <form action={action}>
            <input name="eventId" type="hidden" value={eventId}/>
            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    La tua Email
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="nome@esempio.com"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.email && <p className="text-red-600 text-xs -mt-1">{state.errors.email}</p>}
            </div>
            <button
                type="submit"
                className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer"
                disabled={pending}
            >
                {pending ? 'Iscrizione...' : 'Iscriviti'}
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs mt-1">{state.errors.genericerror}</p>}
        </form>
    );
}