"use client";
import React, {useActionState, useEffect, useState} from "react";
import {useUser} from "@/context/UserContext";
import {getAllOrganizerEvents} from "@/db/actions/getAllOrganizerEvents";
import {createActivity} from "@/db/actions/createActivity";
const fetchEvent = async (id: number): Promise<any> => {
    try {
        return getAllOrganizerEvents(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};
export default function CreateActivityForm() {
    const [state, action, pending] = useActionState(createActivity, undefined)
    const [eventList, setEventList] = useState([]);
    const { userId } = useUser();
    useEffect(() => {
        fetchEvent(parseInt(userId.toString())).then(res => {
            console.log(res);
            setEventList(res || [])});
    }, []);
    return (
        <form action={action}>
            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Titolo
                </label>
                <input type="text" name="title" placeholder="Es. Ballo"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.title && <p className="text-red-600 text-xs -mt-1">{state.errors.title}</p>}
            </div>

            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Durata (ore)
                </label>
                <input type="number" name="time" placeholder="2"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.time && <p className="text-red-600 text-xs -mt-1">{state.errors.time}</p>}
            </div>

            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Data
                </label>
                <input type="datetime-local" name="date"
                       className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                {state?.errors?.date && <p className="text-red-600 text-xs -mt-1">{state.errors.date}</p>}
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

            <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer">
                Crea attività
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs -mt-1">{state.errors.genericerror}</p>}
        </form>

    );
}