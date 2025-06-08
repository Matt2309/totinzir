'use server'
import Payment from "@/db/models/Payment";

export async function getUserPaymentMethods(id) {
    try {
        return await Payment.getByUserId(id);
    }  catch (error: any) {
        console.error("Unexpected error during getUserPaymentMethods:", error);
        return [];
    }
}