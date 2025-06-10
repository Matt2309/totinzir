'use server'
import Ticket from "@/db/models/Ticket";
import Event from "@/db/models/Event";

export async function getTotalIncomeByUser(id) {
    try {
        return await Event.getTotalRevenueByUserId(id)
    }  catch (error: any) {
        console.error("Unexpected error during getTotalIncomeByUser:", error);
        return [];
    }
}
export async function getTotalTicketIncomeByUser(id) {
    try {
        return await Ticket.getTotalRevenueByUserId(id)
    }  catch (error: any) {
        console.error("Unexpected error during getEventList:", error);
        return [];
    }
}
export async function getTotalTicketsSoldByUser(id) {
    try {
        return await Ticket.getTotalSold(id)
    }  catch (error: any) {
        console.error("Unexpected error during getEventList:", error);
        return [];
    }
}