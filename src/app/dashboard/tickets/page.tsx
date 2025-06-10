'use client'

import AnalyticsCard from "@/components/AnalyticsCard";
import React, {useEffect, useState} from "react";
import {CreateTicketTypeModal} from "@/components/CreateTicketTypeModal";
import {getTicketTypesByUser} from "@/db/actions/getTicketTypesByUser";
import {useUser} from "@/context/UserContext";
import {getTotalIncomeByUser, getTotalTicketIncomeByUser, getTotalTicketsSoldByUser} from "@/db/actions/stats";

const fetchTypes = async (id): Promise<any> => {
    try {
        return getTicketTypesByUser(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

const fetchTotalSold = async (id): Promise<any> => {
    try {
        return getTotalTicketsSoldByUser(id);
    } catch (error) {
        console.error(`Errore nel recupero ticket`, error);
        return [];
    }
};

const fetchTotalRevenue = async (id): Promise<any> => {
    try {
        return getTotalTicketIncomeByUser(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

export default function Tickets() {
    const [ticketList, setTicketList] = useState([]);
    const [totalSold, setTotalSold] = useState(0);
    const [totalRev, setTotalRev] = useState(0);

    const { userId } = useUser();

    useEffect(() => {
        fetchTypes(userId).then(res => {
            console.log(res);
            setTicketList(res || [])});

        fetchTotalSold(userId).then(res => {
            setTotalSold(res || 0)});

        fetchTotalRevenue(userId).then(res => {
            setTotalRev(res || 0)});
    }, []);

  return (
    <div>
        <main>
            <div className="flex flex-row gap-8 items-center">
                <h1 className="dashboard-title">Gestione biglietti</h1>
                <CreateTicketTypeModal/>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <AnalyticsCard title={"Biglietti totali"} value={totalSold.toString()} color={"--button_blue"}/>
                <AnalyticsCard title={"Incasso totale"} value={`€${totalRev}`} color={"--button_orange"}/>
            </div>

            <div className="flex flex-row gap-10 mt-5">
                <div className="datatable relative flex flex-col w-full h-full text-gray-700 bg-white shadow-lg rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Titolo
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Prezzo
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Nome evento
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Età minima
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Età massima
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Creato il
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Scadenza
                                </p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {ticketList.map((ticket, index) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200" key={index}>
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">{ticket.title}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">€{ticket.price}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{ticket.event.title}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{ticket.minAge}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{ticket.maxAge}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{ticket.startDate.toLocaleDateString()}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{ticket.endDate.toLocaleDateString()}</p>
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