'use server'
import Event from "@/db/models/Event";

export async function deleteEventById(id) {
    try {
        await Event.delete(id)
    }  catch (error: any) {
        console.error("Unexpected error during getEventList:", error);
        return [];
    }
}