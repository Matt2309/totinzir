'use server'
import DiscountCode from "@/db/models/DiscountCode";

export async function getDiscountList(id: number) {
    try {
        return await DiscountCode.getAllByUserId(id);
    }  catch (error: any) {
        console.error("Unexpected error during getDiscountList:", error);

        return {
            errors: {
                genericerror: ["Errore durante la fetch dei codici sconto. Riprova più tardi."],
            },
        };
    }
}