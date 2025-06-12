'use client';

import { useActionState, useEffect, useState } from 'react';
import {getEventList} from "@/db/actions/getEventList";
import {CreateDiscountCodeFormState} from "@/lib/definitions";
import {createDiscountCode} from "@/db/actions/createDiscountCode";

interface Event {
    id: number;
    title: string;
}

export default function CreateDiscountCodeForm() {
    const [state, action, pending] = useActionState<CreateDiscountCodeFormState, FormData>(createDiscountCode, undefined);
    const [events, setEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorLoadingEvents, setErrorLoadingEvents] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoadingEvents(true);
                const fetchedEvents = await getEventList();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Errore nel recuperare gli eventi:", error);
                setErrorLoadingEvents("Impossibile caricare gli eventi disponibili. Riprova più tardi.");
            } finally {
                setLoadingEvents(false);
            }
        }
        fetchEvents();
    }, []);

    return (
        <form action={action}>
            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Codice Sconto (es. SUMMER20)
                </label>
                <input
                    type="text"
                    name="code"
                    placeholder="Inserisci il codice unico"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.code && <p className="text-red-600 text-xs -mt-1">{state.errors.code}</p>}
            </div>

            <div className="mt-4">
                <label className="font-medium text-left block text-sm text-blue-gray-700">
                    Nome Codice Sconto
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Inserisci un nome descrittivo"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.name && <p className="text-red-600 text-xs -mt-1">{state.errors.name}</p>}
            </div>

            <div className="mt-4">
                <label className="font-medium text-left block text-sm text-blue-gray-700">
                    Percentuale Sconto (es. 0.10 per 10%)
                </label>
                <input
                    type="number"
                    name="discountPerc"
                    step="0.01"
                    min="0"
                    max="1"
                    placeholder="Es. 0.10"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.discountPerc && <p className="text-red-600 text-xs -mt-1">{state.errors.discountPerc}</p>}
            </div>

            <div className="mt-4">
                <label htmlFor="eventId" className="font-medium text-left block text-sm text-blue-gray-700">
                    Collega a Evento <span className="text-red-500">*</span>
                </label>
                {loadingEvents ? (
                    <p>Caricamento eventi...</p>
                ) : errorLoadingEvents ? (
                    <p className="text-red-600 text-xs">{errorLoadingEvents}</p>
                ) : (
                    <select
                        name="eventId"
                        id="eventId"
                        className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                        defaultValue=""
                    >
                        <option value="" disabled>Seleziona un evento</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                )}
                {state?.errors?.eventId && <p className="text-red-600 text-xs -mt-1">{state.errors.eventId}</p>}
            </div>

            <button
                type="submit"
                className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer"
                disabled={pending || loadingEvents}
            >
                {pending ? 'Creazione...' : 'Crea Codice Sconto'}
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs mt-1">{state.errors.genericerror}</p>}
        </form>
    );
}