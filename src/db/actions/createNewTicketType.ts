'use server'

import {CreateNewTicketFormState, CreateNewTicketTypeSchema} from "@/lib/definitions";
import {redirect} from "next/navigation";
import {getSession} from "@/lib/sessions";
import TicketType from "@/db/models/TicketType";

export async function createNewTicketType(state: CreateNewTicketFormState, formData: FormData) {
    let err = false;
    try {
        const session = await getSession();
        const userId = session?.userId;
        const params = {
            title: formData.get('title') as string,
            minAge: formData.get('minAge') || null as number,
            maxAge: formData.get('maxAge') || null as number,
            price: formData.get('price') as number,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            eventId: formData.get('eventId') as number,
            userId: userId,
        }

        await CreateNewTicketTypeSchema.validate({
            title: params.title,
            minAge: params.minAge,
            maxAge: params.maxAge,
            price: params.price,
            startDate: params.startDate,
            endDate: params.endDate,
            eventId: params.eventId,
        }, { abortEarly: false });

        await TicketType.add(params);

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

        console.error("Unexpected error during createNewTicketType:", error);

        return {
            errors: {
                genericerror: ["Errore durante la creazione della tipologia. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
            redirect('/dashboard/tickets');
        }
    }
}
