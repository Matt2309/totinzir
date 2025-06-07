'use server'

import Sponsor from "@/db/models/Sponsor";

export async function getSponsorList(userId: number){
    try {
        return await Sponsor.getAll(userId);
    }  catch (error: any) {
        console.error("Unexpected error during getSponsorList:", error);

        return [];
    }
}