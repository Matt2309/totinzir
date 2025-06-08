'use server'

import {redirect} from "next/navigation";
import {getSession} from "@/lib/sessions";
import {CreateReviewFormState, CreateReviewSchema} from "@/lib/definitions";
import Review from "@/db/models/Review";

export async function createReview(state: CreateReviewFormState, formData: FormData) {
    let err = false;
    try {
        const session = await getSession();
        const userId = session?.userId;

        if (!userId) {
            return {
                errors: {
                    genericerror: ["Utente non autenticato. Effettua il login per lasciare una recensione."],
                },
            };
        }

        const params = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            stars: parseInt(formData.get('stars') as string),
            purchased: formData.get('purchased') === 'on',
            eventId: formData.get('eventId') ? parseInt(formData.get('eventId') as string) : undefined,
            userId: userId,
        };

        await CreateReviewSchema.validate(
            {
                title: params.title,
                description: params.description,
                stars: params.stars,
                purchased: params.purchased,
                eventId: params.eventId || null,
            },
            { abortEarly: false }
        );

        await Review.add(params);

    } catch (error: any) {
        err = true;
        console.error("Unexpected error during createReview:", error);
        return {
            errors: {
                genericerror: ["Errore durante la creazione della recensione. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
            redirect('/');
        }
    }
}