'use server'
import Event, {EventInterface} from "@/db/models/Event";

export async function getEventList():Promise<EventInterface[]> {
    try {
        return await Event.getAll();
    }  catch (error: any) {
        console.error("Unexpected error during getAllEvents:", error);

        return [];
    }
}