'use server'
import User from "@/db/models/User";

export async function removeOrganizer(email) {
    try {
        await User.downgradeRoleToVisitor(email)
    }  catch (error: any) {
        console.error("Unexpected error during removeOrganizer:", error);
        return [];
    }
}