'use server'
import Event from "@/db/models/Event";
import TicketType from "@/db/models/TicketType";

export async function getEventWithCategoryAndTicket(id: number) {
    const event = await Event.getById(id);
    const ticketTypes = await TicketType.getAllByEvent(event.id);
    if (!event) {
        throw new Error(`Evento con ID ${id} non trovato.`);
    }
    return {
        ...event,
        ticketTypes: ticketTypes,
    };
}
