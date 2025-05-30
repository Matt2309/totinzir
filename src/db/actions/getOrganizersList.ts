'use server'
import Organizer from "@/db/models/Organizer";

export async function getOrganizerList() {
    try {
        return await Organizer.getAll();
    }  catch (error: any) {
        console.error("Unexpected error during getOrganizerList:", error);

        return {
            errors: {
                genericerror: ["Errore durante la fetch degli organizzatori. Riprova più tardi."],
            },
        };
    }
}