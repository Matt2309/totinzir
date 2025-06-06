'use server'
import Ticket from "@/db/models/Ticket";

export async function getTotalTicketsSoldByUser(id) {
    try {
        return await Ticket.getTotalRevenueUserId(id)
    }  catch (error: any) {
        console.error("Unexpected error during getEventList:", error);
        return [];
    }
}