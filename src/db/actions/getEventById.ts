'use server'
import Event from "@/db/models/Event";

export async function getEventWithCategory(id: number) {
    const event = await Event.getById(id);
    console.log("evento pazzo: ", event)
    if (!event) {
        throw new Error(`Evento con ID ${id} non trovato.`);
    }
    return {
        ...event,
    };
}
