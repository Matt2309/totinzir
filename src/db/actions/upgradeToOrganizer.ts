'use server'

import {redirect} from "next/navigation";
import Organizer from "@/db/models/Organizer";
import {UpgradeToOrganizerFormState, UpgradeToOrganizerSchema} from "@/lib/definitions";
import User from "@/db/models/User";

export async function upgradeToOrganizer(state: UpgradeToOrganizerFormState, formData: FormData) {
    let err = false;
    try {
        const params = {
            email: formData.get('email') as string,
            companyName: formData.get('companyName') as string,
            vatNumber: formData.get('vatNumber') as string,
        }

        await UpgradeToOrganizerSchema.validate({
            email: params.email,
            companyName: params.companyName,
            vatNumber: params.vatNumber,

        }, { abortEarly: false });

        await Organizer.add(params);
        await User.upgradeRoleToOrganizer(params.email);
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
            redirect('/dashboard/organizers');
        }
    }
}
