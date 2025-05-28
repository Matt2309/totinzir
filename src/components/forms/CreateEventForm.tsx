"use client";
import React, {useActionState, useEffect, useState} from "react";
import {createEvent} from "@/db/actions/createEvent";
import {getCategoryList} from "@/db/actions/getCategoryList";
const fetchCategories = async (): Promise<any> => {
    try {
        return getCategoryList();
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

export default function CreateEventForm() {
    const [state, action, pending] = useActionState(createEvent, undefined)
    const [categoriesList, setCategoriesList] = useState([]);
    useEffect(() => {
        fetchCategories().then(res => {
            console.log(res);
            setCategoriesList(res || [])});
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
                                Data inizio
                            </label>
                            <input type="datetime-local" name="startDate"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.startDate && <p className="text-red-600 text-xs -mt-1">{state.errors.startDate}</p>}
                        </div>
                        <div className="w-full">
                            <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                                Data fine
                            </label>
                            <input type="datetime-local" name="endDate"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.endDate && <p className="text-red-600 text-xs -mt-1">{state.errors.endDate}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Luogo
                        </label>
                        <input type="text" name="location" placeholder="Es. Roma, Teatro Massimo"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.location && <p className="text-red-600 text-xs -mt-1">{state.errors.location}</p>}
                    </div>

                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Coordinate
                        </label>
                        <input type="text" name="coordinates" placeholder="Es. 41.9028, 12.4964"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.coordinates && <p className="text-red-600 text-xs -mt-1">{state.errors.coordinates}</p>}
                    </div>

                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Immagine (URL)
                        </label>
                        <input type="url" name="image" placeholder="https://esempio.com/immagine.jpg"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.image && <p className="text-red-600 text-xs -mt-1">{state.errors.image}</p>}
                    </div>
                </div>

                <div className="w-full">
                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Tipo
                        </label>
                        <select name="category"
                                className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full">
                            <option value="">Seleziona la categoria</option>
                            {categoriesList.map((category, index) => (
                                <option key={index} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                        {state?.errors?.type && <p className="text-red-600 text-xs -mt-1">{state.errors.category}</p>}
                    </div>

                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Argomento (opzionale)
                        </label>
                        <input type="text" name="topic" placeholder="Es. Arte Contemporanea"
                               className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                        {state?.errors?.topic && <p className="text-red-600 text-xs -mt-1">{state.errors.topic}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="w-full">
                            <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                                Nome guida (opzionale)
                            </label>
                            <input type="text" name="guideName" placeholder="Es. Mario Rossi"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.guideName && <p className="text-red-600 text-xs -mt-1">{state.errors.guideName}</p>}
                        </div>
                        <div className="w-full">
                            <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                                Numero guida (opzionale)
                            </label>
                            <input type="tel" name="guideNumber" placeholder="+39 333 1234567"
                                   className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-full" />
                            {state?.errors?.guideNumber && <p className="text-red-600 text-xs -mt-1">{state.errors.guideNumber}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mt-2 font-medium text-left block text-sm text-blue-gray-700">
                            Descrizione
                        </label>
                        <textarea name="description" rows="6" placeholder="Inserisci una descrizione dell'evento"
                                  className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md p-2 text-sm w-full"></textarea>
                        {state?.errors?.description && <p className="text-red-600 text-xs -mt-1">{state.errors.description}</p>}
                    </div>
                </div>
            </div>
            <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 rounded-md text-white mt-5 text-md cursor-pointer">
                Crea evento
            </button>
            {state?.errors?.genericerror && <p className="text-red-600 text-xs -mt-1">{state.errors.genericerror}</p>}
        </form>

    );
}