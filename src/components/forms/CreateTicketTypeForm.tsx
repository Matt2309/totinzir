"use client";
import React, {useActionState, useEffect, useState} from "react";
import {getEventList} from "@/db/actions/getEventList";
import {createNewTicketType} from "@/db/actions/createNewTicketType";
const fetchEvent = async (): Promise<any> => {
    try {
        return getEventList();
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

export default function CreateTicketTypeForm() {
    const [state, action, pending] = useActionState(createNewTicketType, undefined)
    const [eventList, setEventList] = useState([]);
    useEffect(() => {
        fetchEvent().then(res => {
            console.log(res);
            setEventList(res || [])});
    }, []);
    return (
        <form action={action}>
            <div className="flex gap-15">
                <div className="w-full">
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Titolo
                        </label>
                        <input type="text" name="title" placeholder="Inserisci il titolo dell'evento"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.title && <p className="text-red-600 text-xs -mt-1">{state.errors.title}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                                Età minima
                            </label>
                            <input type="text" name="minAge" placeholder="14"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.minAge && <p className="text-red-600 text-xs -mt-1">{state.errors.minAge}</p>}
                        </div>
                        <div className="w-full">
                            <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                                Età massima
                            </label>
                            <input type="text" name="maxAge" placeholder="21"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.maxAge && <p className="text-red-600 text-xs -mt-1">{state.errors.maxAge}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Prezzo
                        </label>
                        <input type="number" name="price" placeholder="€16"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.price && <p className="text-red-600 text-xs -mt-1">{state.errors.price}</p>}
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                                Inizio validità
                            </label>
                            <input type="datetime-local" name="startDate"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.startDate && <p className="text-red-600 text-xs -mt-1">{state.errors.startDate}</p>}
                        </div>
                        <div className="w-full">
                            <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                                Fine validità
                            </label>
                            <input type="datetime-local" name="endDate"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.endDate && <p className="text-red-600 text-xs -mt-1">{state.errors.endDate}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Evento
                        </label>
                        <select name="eventId"
                                className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full">
                            <option value="">Seleziona l'evento</option>
                            {eventList.map((event, index) => (
                                <option key={index} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                        {state?.errors?.eventId && <p className="text-red-600 text-xs -mt-1">{state.errors.eventId}</p>}
                    </div>
                </div>
            </div>
            <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer">
                Crea tipologia
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs -mt-1">{state.errors.genericerror}</p>}
        </form>

    );
}