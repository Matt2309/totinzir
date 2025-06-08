"use client";
import React, {useActionState, useEffect, useState} from "react";
import {createCategory} from "@/db/actions/createCategory";
import {getAllOrganizerEvents} from "@/db/actions/getAllOrganizerEvents";
import {useUser} from "@/context/UserContext";
import {getStandTypes} from "@/db/actions/getStandTypes";
import {createStand} from "@/db/actions/createStand";
import {CreateStandFormState} from "@/lib/definitions";

const fetchEvent = async (id: number): Promise<any> => {
    try {
        return getAllOrganizerEvents(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

const fetchStandType = async (): Promise<any> => {
    try {
        return getStandTypes();
    } catch (error) {
        console.error(`Errore nel recupero tipi stand`, error);
        return [];
    }
};


export default function CreateStandForm() {
    const [state, action, pending] = useActionState<CreateStandFormState, FormData>(createStand, undefined);
    const [eventList, setEventList] = useState([]);
    const [standTypes, setStandTypes] = useState([]);

    const { userId } = useUser();
    useEffect(() => {
        fetchEvent(parseInt(userId.toString())).then(res => {
            setEventList(res || [])});

        fetchStandType().then(res => {
            setStandTypes(res || [])});
    }, []);

    return (
        <form action={action}>
            <div>
                <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                    Nome Stand
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Inserisci il nome dello stand"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.name && <p className="text-red-600 text-xs -mt-1">{state.errors.name}</p>}
            </div>

            <div className="mt-4">
                <label className="font-medium text-left block text-sm text-blue-gray-700">
                    Logo URL
                </label>
                <input
                    type="text"
                    name="logo"
                    placeholder="Inserisci l'URL del logo"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.logo && <p className="text-red-600 text-xs -mt-1">{state.errors.logo}</p>}
            </div>

            <div className="mt-4">
                <label className="font-medium text-left block text-sm text-blue-gray-700">
                    Posizione
                </label>
                <input
                    type="text"
                    name="position"
                    placeholder="Es. Padiglione A, Sezione 3"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.position && <p className="text-red-600 text-xs -mt-1">{state.errors.position}</p>}
            </div>

            <div className="mt-4">
                <label className="font-medium text-left block text-sm text-blue-gray-700">
                    Origine
                </label>
                <input
                    type="text"
                    name="origin"
                    placeholder="Es. Italia"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                />
                {state?.errors?.origin && <p className="text-red-600 text-xs -mt-1">{state.errors.origin}</p>}
            </div>

            <div className="mt-4">
                <label htmlFor="standType" className="font-medium text-left block text-sm text-blue-gray-700">
                    Tipo di Stand
                </label>
                <select
                    name="typeId"
                    id="standType"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                >
                    <option value="">Seleziona un tipo di stand</option>
                    {standTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.title}
                        </option>
                    ))}
                </select>
                {state?.errors?.typeId && <p className="text-red-600 text-xs -mt-1">{state.errors.typeId}</p>}
            </div>

            <div className="mt-4">
                <label htmlFor="eventId" className="font-medium text-left block text-sm text-blue-gray-700">
                    Collega a Evento
                </label>
                <select
                    name="eventId"
                    id="eventId"
                    className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full"
                >
                    <option value="">Seleziona un evento</option>
                    {eventList.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.title}
                        </option>
                    ))}
                </select>
                {state?.errors?.eventId && <p className="text-red-600 text-xs -mt-1">{state.errors.eventId}</p>}
            </div>

            <button
                type="submit"
                className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer"
                disabled={pending}
            >
                {pending ? 'Creazione...' : 'Crea Stand'}
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs mt-1">{state.errors.genericerror}</p>}
        </form>

    );
}