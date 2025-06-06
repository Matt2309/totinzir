'use server'

import {CreateCategoryFormState, CreateCategorySchema} from "@/lib/definitions";
import {redirect} from "next/navigation";
import Category from "@/db/models/Category";
import {getSession} from "@/lib/sessions";

export async function createCategory(state: CreateCategoryFormState, formData: FormData) {
    let err = false;
    try {
        const session = await getSession();
        const userId = session?.userId;
        const params = {
            title: formData.get('title') as string,
            duration: formData.get('duration') as number,
            difficulty: formData.get('difficulty') as string,
            userId: userId,
        }

        await CreateCategorySchema.validate({
            title: params.title,
            duration: params.duration || null,
            difficulty: params.difficulty,
        }, { abortEarly: false });

        await Category.add(params);

    }  catch (error: any) {
        err = true;
        if (error?.name === "ValidationError") {
            const errors: Record<string, string[]> = {};
            error.inner.forEach((err: any) => {
                if (err.path) {
                    errors[err.path] = errors[err.path] || [];
                    errors[err.path].push(err.message);
                }
            });
            return { errors };
        }

        console.error("Unexpected error during createCategory:", error);

        return {
            errors: {
                genericerror: ["Errore durante la creazione della categoria. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
            redirect('/dashboard/categories');
        }
    }
}
