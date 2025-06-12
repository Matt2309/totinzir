'use server';

import { redirect } from 'next/navigation';
import {CreateDiscountCodeFormState, CreateDiscountCodeSchema} from "@/lib/definitions";
import DiscountCode from "@/db/models/DiscountCode";

export async function createDiscountCode(state: CreateDiscountCodeFormState, formData: FormData) {
    let err = false;
    try {
        const params = {
            code: formData.get('code') as string,
            name: formData.get('name') as string,
            discountPerc: parseFloat(formData.get('discountPerc') as string),
            eventId: parseInt(formData.get('eventId') as string),
        };

        await CreateDiscountCodeSchema.validate(
            {
                code: params.code,
                name: params.name,
                discountPerc: params.discountPerc,
                eventId: params.eventId,
            },
            { abortEarly: false }
        );

        await DiscountCode.add(params);

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
        if (error?.code === 'P2002' && error?.meta?.target?.includes('code')) {
            return {
                errors: {
                    code: ["Questo codice sconto esiste già. Scegli un codice diverso."],
                },
            };
        }

        console.error("Errore imprevisto durante la creazione del codice sconto:", error);

        return {
            errors: {
                genericerror: ["Errore durante la creazione del codice sconto. Riprova più tardi."],
            },
        };
    } finally {
        if (!err) {
            redirect('/dashboard/discount-codes');
        }
    }
}