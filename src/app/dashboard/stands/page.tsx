'use client'

import AnalyticsCard from "@/components/AnalyticsCard";
import React, {useEffect, useState} from "react";
import {useUser} from "@/context/UserContext";
import {CreateStandModal} from "@/components/CreateStandModal";
import {getStandByUID} from "@/db/actions/getStandByUID";

const fetchStands = async (id): Promise<any> => {
    try {
        return getStandByUID(id);
    } catch (error) {
        console.error(`Errore nel recupero stands`, error);
        return [];
    }
};

export default function Tickets() {
    const [standList, setStandList] = useState([]);
    const { userId } = useUser();

    useEffect(() => {
        fetchStands(userId).then(res => {
            setStandList(res || [])});
        console.log("res",standList)
    }, []);

    useEffect(() => {
        console.log("res",standList)
    }, [standList]);

    if (!standList) return <p>Caricamento stand...</p>
  return (
    <div>
        <main>
            <div className="flex flex-row gap-8 items-center">
                <h1 className="dashboard-title">Gestione stands</h1>
                <CreateStandModal/>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <AnalyticsCard title={"Biglietti totali"} value={"1.000"} color={"--button_blue"}/>
                <AnalyticsCard title={"Incasso totale"} value={"€ 230000"} color={"--button_orange"}/>
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
                                    Posizione
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Evento
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Origine
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Dimensione
                                </p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {standList.map((stand, index) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200" key={index}>
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">{stand.name}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{stand.position}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{stand.exhibitions[0].event.title}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{stand.origin}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{stand.type.title}</p>
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