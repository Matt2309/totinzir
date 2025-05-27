'use server'
import Event from "@/db/models/Event";

export async function getEventList() {
    try {
        return await Event.getAll();
    }  catch (error: any) {
        console.error("Unexpected error during getAllEvents:", error);

        return {
            errors: {
                genericerror: ["Errore durante la fetch degli eventi. Riprova più tardi."],
            },
        };
    }
}