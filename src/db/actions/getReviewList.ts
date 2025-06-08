'use server'
import Review from "@/db/models/Review";

export async function getReviewList(id: number) {
    try {
        return await Review.getAllByEventId(id);
    }  catch (error: any) {
        console.error("Unexpected error during getReviewList:", error);

        return {
            errors: {
                genericerror: ["Errore durante la fetch delle categorie. Riprova più tardi."],
            },
        };
    }
}