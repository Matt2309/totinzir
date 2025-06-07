'use server'
import Sponsor from "@/db/models/Sponsor";

export async function getEventSponsorList(eventId: number){
    try {
        return await Sponsor.getAllByEvent(eventId);
    }  catch (error: any) {
        console.error("Unexpected error during getEventSponsorList:", error);

        return [];
    }
}