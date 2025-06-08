'use server'
import StandType from "@/db/models/StandType";

export async function getStandTypes(){
    try {
        return await StandType.getAll();
    }  catch (error: any) {
        console.error("Unexpected error during getStandTypes:", error);

        return [];
    }
}