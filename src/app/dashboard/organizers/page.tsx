'use client'
import React, {useEffect, useState} from "react";
import {CreateOrganizerModal} from "@/components/CreateOrganizerModal";
import {getOrganizerList} from "@/db/actions/getOrganizersList";

const fetchOrganizer = async (): Promise<any> => {
    try {
        return getOrganizerList();
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};

export default function Events() {
    const [organizerList, setOrganizerList] = useState([]);
    useEffect(() => {
        fetchOrganizer().then(res => {
            console.log(res);
            setOrganizerList(res || [])});
    }, []);
  return (
    <div>
        <main>
            <div className="flex flex-row gap-8 items-center">
                <h1 className="dashboard-title">Gestione organizzatori</h1>
                <CreateOrganizerModal/>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <div className="datatable relative flex flex-col w-full h-full text-gray-700 bg-white shadow-lg rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Ragione sociale
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    P.IVA
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]">
                                <p className="text-sm font-normal leading-none text-slate-700">
                                    Email
                                </p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {organizerList.map((organizer, index) => (
                            <tr className="hover:bg-slate-50 border-b border-slate-200" key={index}>
                                <td className="p-4 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">{organizer.companyName}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{organizer.vatNumber}</p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-sm text-slate-500">{organizer.user["email"]}</p>
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