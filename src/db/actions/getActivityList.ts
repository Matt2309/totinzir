'use server'

import Activity from "@/db/models/Activity";

export async function getActivityList(userId: number){
    try {
        return await Activity.getAllByUserId(userId);
    }  catch (error: any) {
        console.error("Unexpected error during getActivityList:", error);

        return [];
    }
}