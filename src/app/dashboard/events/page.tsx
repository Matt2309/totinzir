'use client'
import AnalyticsCard from "@/components/AnalyticsCard";
import React, {useEffect, useState} from "react";
import {CreateEventModal} from "@/components/CreateEventModal";
import {getAllOrganizerEvents} from "@/db/actions/getAllOrganizerEvents";
import {useUser} from "@/context/UserContext";
import {getTotalTicketsSoldByUser} from "@/db/actions/stats";

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
        return getTotalTicketsSoldByUser(id);
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