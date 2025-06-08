'use server'

import {redirect} from "next/navigation";
import {
    CreateActivityFormState,
    CreateActivitySchema,
} from "@/lib/definitions";
import Activity from "@/db/models/Activity";

export async function createActivity(state: CreateActivityFormState, formData: FormData) {
    let err = false;
    try {
        const params = {
            title: formData.get('title') as string,
            time: formData.get('time') as number,
            date: formData.get('date') as string,
            eventId: formData.get('eventId') as number,
        }

        await CreateActivitySchema.validate({
            title: params.title,
            time: params.time,
            date: params.date,
            eventId: params.eventId,
        }, { abortEarly: false });

        await Activity.add(params);

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

        console.error("Unexpected error during createEvent:", error);

        return {
            errors: {
                genericerror: ["Errore durante la creazione dell0'evento. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
            redirect('/dashboard/activities');
        }
    }
}
