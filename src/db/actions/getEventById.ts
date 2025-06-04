'use server'
import Event from "@/db/models/Event";

export async function getEvent(id: number) {
    const event = await Event.getById(id);
    return {
        ...event,
    };
}
