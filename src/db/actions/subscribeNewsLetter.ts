'use server';

import { redirect } from 'next/navigation';
import {SubscribeNewsletterFormState, SubscribeNewsletterSchema} from "@/lib/definitions";
import NewsLetter from "@/db/models/NewsLetter";

export async function subscribeNewsletter(state: SubscribeNewsletterFormState, formData: FormData) {
    let err = false;
    try {
        const params = {
            email: formData.get('email') as string,
            eventId: parseInt(formData.get('eventId') as string),
            signUpDate: new Date(),
        };

        await SubscribeNewsletterSchema.validate(
            {
                email: params.email,
                eventId: params.eventId,
            },
            { abortEarly: false }
        );

        await NewsLetter.add(params);

    } catch (error: any) {
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

        console.error("Errore imprevisto durante l'iscrizione alla newsletter:", error);

        return {
            errors: {
                genericerror: ["Errore durante l'iscrizione alla newsletter. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
            redirect('/');
        }
    }
}