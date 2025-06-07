"use client";
import React, {useActionState, useEffect, useState} from "react";
import {getAllOrganizerEvents} from "@/db/actions/getAllOrganizerEvents";
import {useUser} from "@/context/UserContext";
import {createNewSponsor} from "@/db/actions/createNewSponsor";
const fetchEvent = async (id: number): Promise<any> => {
    try {
        return getAllOrganizerEvents(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

export default function CreateSponsorForm() {
    const [state, action, pending] = useActionState(createNewSponsor, undefined)
    const [eventList, setEventList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const { userId } = useUser();
    useEffect(() => {
        fetchEvent(parseInt(userId.toString())).then(res => {
            setEventList(res || [])});
    }, []);
    const handleChange = (event) => {
        const { options } = event.target;
        const newSelectedOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                newSelectedOptions.push(options[i].value);
            }
        }
        setSelectedOptions(newSelectedOptions);
    };
    return (
        <form action={action}>
            <input type="hidden" name="events" value={selectedOptions} />
            <div className="flex gap-15">
                <div className="w-full">
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Nome
                        </label>
                        <input type="text" name="name" placeholder="Inserisci il nome dello sponsor"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.name && <p className="text-red-600 text-xs -mt-1">{state.errors.name}</p>}
                    </div>
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Referente
                        </label>
                        <input type="text" name="contactName" placeholder="Inserisci il nome del referente"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.contactName && <p className="text-red-600 text-xs -mt-1">{state.errors.contactName}</p>}
                    </div>

                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Budget
                        </label>
                        <input type="number" step="0.01" name="budget" placeholder="€2000"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.budget && <p className="text-red-600 text-xs -mt-1">{state.errors.budget}</p>}
                    </div>
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Immagine (URL)
                        </label>
                        <input type="url" name="image" placeholder="https://esempio.com/immagine.jpg"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.image && <p className="text-red-600 text-xs -mt-1">{state.errors.image}</p>}
                    </div>
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Tipo
                        </label>
                        <select name="type"
                                className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full">
                            <option value="">Seleziona la categoria</option>
                            <option value="main">Main</option>
                            <option value="silver">Silver</option>
                        </select>
                        {state?.errors?.type && <p className="text-red-600 text-xs -mt-1">{state.errors.type}</p>}
                    </div>
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Evento
                        </label>

                        <select
                            multiple
                            name="events"
                            value={selectedOptions}
                            onChange={handleChange}
                            className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-50 p-2 text-sm w-full"
                        >
                            {eventList.map((event, index) => (
                                <option key={index} value={event.id}>
                                    {event.title}
                                </option>
                            ))}
                        </select>
                        <p>Eventi selezionati: {selectedOptions.flatMap(op => eventList.filter(ev => ev.id == op).map(ev => ev.title)).join(' - ')}</p>

                        {state?.errors?.events && <p className="text-red-600 text-xs -mt-1">{state.errors.events}</p>}
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