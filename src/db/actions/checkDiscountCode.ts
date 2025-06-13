'use server'
import DiscountCode from "@/db/models/DiscountCode";

export async function checkDiscountCode(code: string) {
    try {
        const res = await DiscountCode.getByCode(code);
        if (res) {
            return res.discountPerc;
        } else {
            return false;
        }
    }  catch (error: any) {
        console.error("Unexpected error during checkDiscountCode:", error);

        return {
            errors: {
                genericerror: ["Errore durante il controllo del codice sconto, Riprova più tardi."],
            },
        };
    }
}