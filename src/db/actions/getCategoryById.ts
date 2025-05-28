'use server'
import Category from "@/db/models/Category";

export async function getCategoryById(id: number) {
    try {
        return await Category.getById(id);
    }  catch (error: any) {
        console.error("Unexpected error during getCategoryList:", error);

        return {
            errors: {
                genericerror: ["Errore durante la fetch delle categorie. Riprova più tardi."],
            },
        };
    }
}