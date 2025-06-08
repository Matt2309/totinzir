'use client'
import React, {useEffect, useState} from "react";
import HeaderMain from "@/components/Headers/HeaderMain";
import UserTicketCard from "@/components/UserTicketCard";
import {getTicketsWallet} from "@/db/actions/getTicketsWallet";
import {useUser} from "@/context/UserContext";

const fetchTickets = async (id): Promise<any> => {
    try {
        return getTicketsWallet(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};
export default function TicketWallet() {
    const { userId } = useUser();
    const [tickets, setTickets] = useState<any>([]);

    useEffect(() => {
        fetchTickets(userId).then(res => {
            setTickets(res || null)
        });
    }, []);

  return (
    <div>
        <main>
            <HeaderMain/>
            <nav className="p-10 pl-50 pr-50">
                <h1 className="text-4xl text-gray-800 mt-10">i tuoi biglietti</h1>
                <hr className="w-15 h-0.5 bg-black border-0 rounded-sm mb-10"/>
                <div className="grid grid-cols-3 gap-x-25 gap-y-15">
                    {tickets.map((ticket, index) => (
                        <UserTicketCard key={index} price={ticket.ticketType.price} date={ticket.ticketType.event.startDate.toLocaleDateString()} barcodeData={ticket.id+"1237843"} eventName={ticket.ticketType.event.title} ticketType={"intero"}/>
                    ))}
                </div>
            </nav>

        </main>
    </div>
  );
}