'use server'
import Stand from "@/db/models/Stand";

export async function getStandByEvent(id: number){
    try {
        return await Stand.getAllByEventId(id);
    }  catch (error: any) {
        console.error("Unexpected error during getStandByUID:", error);

        return [];
    }
}