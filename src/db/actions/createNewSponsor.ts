'use server'

import {CreateSponsorSchema, SponsorFormState} from "@/lib/definitions";
import {redirect} from "next/navigation";
import Sponsor from "@/db/models/Sponsor";

export async function createNewSponsor(state: SponsorFormState, formData: FormData) {
    let err = false;
    try {
        const params = {
            name: formData.get('name') as string,
            contactName: formData.get('contactName') as string,
            budget: formData.get('budget') as number,
            image: formData.get('image') as string,
            type: formData.get('type') as string,
            eventString: formData.get('events') as string,
            events: []
        }
        const eventsArray = params.eventString.split(',').flatMap(ev => parseInt(ev));
        params.events = eventsArray;

        await CreateSponsorSchema.validate({
            name: params.name,
            contactName: params.contactName,
            budget: params.budget,
            image: params.image,
            type: params.type,
            events: eventsArray,
        }, { abortEarly: false });
        await Sponsor.add(params);

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

        console.error("Unexpected error during createNewSponsor:", error);

        return {
            errors: {
                genericerror: ["Errore durante la creazione dello sponsor. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
           redirect('/dashboard/sponsors');
        }
    }
}
