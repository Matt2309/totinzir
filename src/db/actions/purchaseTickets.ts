'use server'
import {PurchaseTicketsFormState, PurchaseTicketsSchema} from '@/lib/definitions';

export async function purchaseTickets(state: PurchaseTicketsFormState, formData: FormData) {
    let redirectLink;
    try {
        const params = {
            firstname: formData.get('firstname') as string,
            lastname: formData.get('lastname') as string,
            day: formData.get('day') as number,
            month: formData.get('month') as number,
            year: formData.get('year') as number,
            email: formData.get('email') as string,
            birthplace: formData.get('birthplace') as string,
            zip: formData.get('zip') as string,
            province: formData.get('province') as string,
            country: formData.get('country') as string,
            address: formData.get('address') as string,
            phone: formData.get('phone') as string,
            cardNumber: formData.get('cardNumber') as string,
            expiryDate: formData.get('expiryDate') as string,
            cvv: formData.get('cvv') as string,
            savePayment: formData.get('savePayment') || false as boolean,
        }


        const birthDate = new Date(params.year, params.month - 1, params.day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        if (age < 0) {
            return null;
        }
        console.log("birthDate ", birthDate)
        await PurchaseTicketsSchema.validate({
            firstname: params.firstname,
            lastname: params.lastname,
            birthDate: birthDate,
            email: params.email,
            birthplace: params.birthplace,
            zip: params.zip,
            country: params.country,
            province: params.province,
            address: params.address,
            phone: params.phone,
            cardNumber: params.cardNumber,
            expiryDate: params.expiryDate,
            cvv: params.cvv,
        }, { abortEarly: false });



        redirectLink = '/';
    } catch (error: any) {
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

        console.error("Unexpected error during purchaseTickets:", error);

        return {
            errors: {
                genericerror: ["Errore durante l'acquisto. Riprova più tardi."],
            },
        };
    } finally {
        if (redirectLink) {
            //redirect(redirectLink);
        }
    }
}