'use server'
import {PurchaseTicketsFormState, PurchaseTicketsSchema} from '@/lib/definitions';
import paymentMethod from "@/db/models/Payment";
import {getSession} from "@/lib/sessions";
import ticket from "@/db/models/Ticket";
import Order from "@/db/models/Order";
import {redirect} from "next/navigation";
import {date} from "yup";

export async function purchaseTickets(state: PurchaseTicketsFormState, formData: FormData) {
    let redirectLink;
    try {
        const session = await getSession();
        const userId = session?.userId;
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
            totalAmount: formData.get('totalAmount') as number,
            commission: formData.get('commission') as number,
        }

        let expiryDateObject = null;
        if (params.expiryDate) {
            const parts = params.expiryDate.split('/');
            if (parts.length === 2) {
                const month = parseInt(parts[0], 10);
                const year = parseInt(parts[1], 10);
                const fullYear = (year < 70 ? 2000 + year : 1900 + year);
                expiryDateObject = new Date(fullYear, month - 1, 1);
            }
        }
        params.expiryDate = expiryDateObject;
        // Access ticket information
        const tickets = [];
        // Iterate through the FormData keys to find all ticket related inputs
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('tickets[')) {
                // Extract index and property name
                const match = key.match(/tickets\[(\d+)\]\[(.*)\]/);
                if (match) {
                    const index = parseInt(match[1]);
                    const property = match[2];

                    if (!tickets[index]) {
                        tickets[index] = {};
                    }
                    tickets[index][property] = value;
                }
            }
        }
        console.log('tickets:', tickets);

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

        if(params.savePayment) {
            await paymentMethod.add({
                cardNumber: params.cardNumber,
                expiryDate: params.expiryDate,
                cvv: params.cvv,
                userId: userId
            });
        }

        const order = await Order.add({
            amount: params.totalAmount,
            userId: userId,
            commission: params.commission
        })

        for (const t of tickets) {
            await ticket.add({
                firstName: params.firstname,
                lastName: params.lastname,
                orderId: order.id,
                ticketTypeId: t.id,
                quantity: t.quantity
            })
        }


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
            redirect(redirectLink);
        }
    }
}