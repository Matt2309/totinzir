'use server'

import {CreateEventFormState, CreateEventSchema} from "@/lib/definitions";
import Event from "@/db/models/Event";
import {redirect} from "next/navigation";
import {getSession} from "@/lib/sessions";

export async function createEvent(state: CreateEventFormState, formData: FormData) {
    let err = false;
    try {
        const session = await getSession();
        const userId = session?.userId;
        const params = {
            title: formData.get('title') as string,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            location: formData.get('location') as string,
            coordinates: formData.get('coordinates') as string,
            category: formData.get('category') as string,
            image: formData.get('image') as string,
            topic: formData.get('topic') as string,
            guideName: formData.get('guideName') as string,
            guideNumber: formData.get('guideNumber') as string,
            description: formData.get('description') as string,
            zip: formData.get('zip') as string,
            city: formData.get('city') as string,
            province: formData.get('province') as string,
            street: formData.get('street') as string,
            country: formData.get('country') as string,
            userId: userId
        }

        await CreateEventSchema.validate({
            title: params.title,
            startDate: params.startDate,
            endDate: params.endDate,
            location: params.location,
            coordinates: params.coordinates,
            category: params.category,
            image: params.image,
            topic: params.topic,
            guideName: params.guideName,
            guideNumber: params.guideNumber,
            description: params.description,
            zip:  params.zip,
            city:  params.city,
            street:  params.street,
            province:  params.province,
            country:  params.country,
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
        if (!err) {
            redirect('/dashboard/events');
        }
    }
}
