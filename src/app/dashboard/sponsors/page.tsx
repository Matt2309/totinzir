'use client'
import AnalyticsCard from "@/components/AnalyticsCard";
import React, {useEffect, useState} from "react";
import {CreateSponsorModal} from "@/components/CreateSponsorModal";
import {getSponsorList} from "@/db/actions/getSponsorList";
import {useUser} from "@/context/UserContext";

const fetchSponsors = async (userId: number): Promise<any> => {
    try {
        return getSponsorList(userId);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

export default function Sponsors() {
    const [sponsorList, setSponsorList] = useState([]);
    const { userId } = useUser();

    useEffect(() => {
        fetchSponsors(parseInt(userId.toString())).then(res => {
            setSponsorList(res || [])});
    }, []);
  return (
    <div>
        <main>
            <div className="flex flex-row gap-8 items-center">
                <h1 className="dashboard-title">Gestione sponsors</h1>
                <CreateSponsorModal/>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <AnalyticsCard title={"Sponsor totali"} value={sponsorList.length.toString()} color={"--button_blue"}/>
                <AnalyticsCard title={"Incasso totale"} value={`€${sponsorList.length > 0 ? sponsorList.reduce((accumulator, currentSponsor) => accumulator + currentSponsor.budget, 0) : 0}`} color={"--button_orange"}/>
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
                                    Referente
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Budget
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Tipo
                                </p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {sponsorList.map((sponsor, index) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200" key={index}>
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">{sponsor.name}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{sponsor.contact}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">€{sponsor.budget}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{sponsor.type}</p>
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