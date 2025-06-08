'use server'
import Activity from "@/db/models/Activity";

export async function getActivitySponsorList(eventId: number){
    try {
        return await Activity.getByEventId(eventId);
    }  catch (error: any) {
        console.error("Unexpected error during getActivitySponsorList:", error);

        return [];
    }
}