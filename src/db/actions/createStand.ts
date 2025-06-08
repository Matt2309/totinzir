'use server';

import { redirect } from 'next/navigation';
import {CreateStandFormState, CreateStandSchema} from "@/lib/definitions";
import Stand from "@/db/models/Stand";

export async function createStand(state: CreateStandFormState, formData: FormData) {
    let err = false;
    try {
        const params = {
            name: formData.get('name') as string,
            logo: formData.get('logo') as string,
            position: formData.get('position') as string,
            origin: formData.get('origin') as string,
            typeId: parseInt(formData.get('typeId') as string),
            eventId: parseInt(formData.get('eventId') as string),
        };

        await CreateStandSchema.validate(
            {
                name: params.name,
                logo: params.logo,
                position: params.position,
                origin: params.origin,
                typeId: params.typeId,
                eventId: params.eventId,
            },
            { abortEarly: false }
        );

        await Stand.add(params);

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

        console.error("Unexpected error during createStand:", error);

        return {
            errors: {
                genericerror: ["Errore durante la creazione dello stand. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
            redirect('/dashboard/stands');
        }
    }
}