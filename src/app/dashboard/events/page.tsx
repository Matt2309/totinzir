'use client'
import AnalyticsCard from "@/components/AnalyticsCard";
import React, {useEffect, useState} from "react";
import {CreateEventModal} from "@/components/CreateEventModal";
import {getAllOrganizerEvents} from "@/db/actions/getAllOrganizerEvents";
import {useUser} from "@/context/UserContext";
import {getTotalIncomeByUser, getTotalTicketIncomeByUser} from "@/db/actions/stats";
import {deleteEventById} from "@/db/actions/deleteEvent";

const fetchEvent = async (id): Promise<any> => {
    try {
        return getAllOrganizerEvents(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

const fetchTotalRevenue = async (id): Promise<any> => {
    try {
        return getTotalIncomeByUser(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

export default function Events() {
    const [eventList, setEventList] = useState([]);
    const [totalRev, setTotalRev] = useState(0);
    const { userId } = useUser();

    useEffect(() => {
        fetchEvent(userId).then(res => {
            setEventList(res || [])});

        fetchTotalRevenue(userId).then(res => {
            setTotalRev(res || 0)});
    }, []);

    const handleDeleteEvent = async (eventId: number, eventTitle: string) => {
        if (!confirm(`Sei sicuro di voler eliminare l'evento "${eventTitle}"? Questa operazione è irreversibile e verrà archiviata.`)) {
            return;
        }

        try {
            await deleteEventById(eventId);
        } catch (error) {
            console.error(`Errore inaspettato durante l'eliminazione evento:`, error);
        }finally {
            fetchEvent(userId).then(res => {
                setEventList(res || [])});
            fetchTotalRevenue(userId).then(res => {
                setTotalRev(res || 0)});
        }
    };

    return (
    <div>
        <main>
            <div className="flex flex-row gap-8 items-center">
                <h1 className="dashboard-title">Gestione eventi</h1>
                <CreateEventModal/>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <AnalyticsCard title={"Eventi totali"} value={eventList.length.toString()} color={"--button_blue"}/>
                <AnalyticsCard title={"Incasso totale"} value={`€${totalRev}`} color={"--button_orange"}/>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <div className="datatable relative flex flex-col w-full h-full text-gray-700 bg-white shadow-lg rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Nome
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Categoria
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Luogo
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Data
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Stato
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Azione
                                </p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {eventList.map((event, index) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200" key={index}>
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">{event.title}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{event.type}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{event.location}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{event.startDate.toLocaleDateString()}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <div className="w-max">
                                        <div
                                            className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-${event.endDate < Date.now() ? "red-500/20" : "green-500/20"} text-blue-gray-900`}>
                                            <span>{event.endDate < Date.now() ? "TERMINATO" : "IN CORSO"}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 py-5">
                                    <button
                                        onClick={() => handleDeleteEvent(event.id, event.title)}
                                        className="flex items-center justify-center p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                                        aria-label="Delete"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center px-4 py-3">
                        <div className="text-sm text-slate-500">
                            Showing <b>1-5</b> of 45
                        </div>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Prev
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                                1
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                2
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                3
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>
  );
}