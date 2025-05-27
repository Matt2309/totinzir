'use server'

import {CreateEventFormState, CreateEventSchema} from "@/lib/definitions";
import Event from "@/db/models/Event";
import {redirect} from "next/navigation";

export async function createEvent(state: CreateEventFormState, formData: FormData) {
    let err = false;
    try {
        const title = formData.get('title') as string;
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;
        const location = formData.get('location') as string;
        const coordinates = formData.get('coordinates') as string;
        const type = formData.get('type') as string;
        const image = formData.get('image') as string;
        const topic = formData.get('topic') as string;
        const guideName = formData.get('guideName') as string;
        const guideNumber = formData.get('guideNumber') as string;
        const description = formData.get('description') as string;

        const params = {
            title: formData.get('title') as string,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            location: formData.get('location') as string,
            coordinates: formData.get('coordinates') as string,
            type: formData.get('type') as string,
            image: formData.get('image') as string,
            topic: formData.get('topic') as string,
            guideName: formData.get('guideName') as string,
            guideNumber: formData.get('guideNumber') as string,
            description: formData.get('description') as string
        }

        await CreateEventSchema.validate({
            title,
            startDate,
            endDate,
            location,
            coordinates,
            type,
            image,
            topic,
            guideName,
            guideNumber,
            description,
        }, { abortEarly: false });

        await Event.add(params);

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
        if (err) {
            redirect('dashboard/events');
        }
    }
}
