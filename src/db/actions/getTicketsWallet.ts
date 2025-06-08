'use server'
import Ticket from "@/db/models/Ticket";

export async function getTicketsWallet(id) {
    try {
        return await Ticket.getUserTickets(id);
    }  catch (error: any) {
        console.error("Unexpected error during getTicketsWallet:", error);
        return [];
    }
}