'use server'
import TicketType from "@/db/models/TicketType";

export async function getTicketTypesByUser(id) {
    try {
        return await TicketType.getByUserId(id);
    }  catch (error: any) {
        console.error("Unexpected error during getTicketTypesByUser:", error);
        return [];
    }
}