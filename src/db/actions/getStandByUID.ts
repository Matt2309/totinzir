'use server'
import Stand from "@/db/models/Stand";

export async function getStandByUID(id: number){
    try {
        return await Stand.getAllByUserId(id);
    }  catch (error: any) {
        console.error("Unexpected error during getStandTypes:", error);

        return [];
    }
}