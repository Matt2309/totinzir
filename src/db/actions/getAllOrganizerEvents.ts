'use server'
import Event from "@/db/models/Event";

export async function getAllOrganizerEvents(id) {
    try {
        return await Event.getByUserId(id);
    }  catch (error: any) {
        console.error("Unexpected error during getEventList:", error);
        return [];
    }
}