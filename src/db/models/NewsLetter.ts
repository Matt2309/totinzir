import {prisma} from '@/lib/prisma'

interface NewsletterCreateParams {
    email: string;
    signUpDate: Date;
    eventId?: number;
}

class Newsletter {
    public async add(params: NewsletterCreateParams) {
        try {
            await prisma.newsletter.create({
                data: {
                    email: params.email,
                    signUpDate: params.signUpDate,
                    ...(params.eventId && {
                        event: {
                            connect: {
                                id: params.eventId,
                            },
                        },
                    }),
                },
            }).then((res) => {
                return { res: `Iscrizione newsletter creata: ${res.id}` };
            });
        } catch (error) {
            if ((error as any).code === 'P2002' && (error as any).meta?.target?.includes('email')) {
                console.error("Tentativo di iscrizione con email già esistente:", params.email);
                throw new Error("Questa email è già iscritta alla newsletter.");
            }
            console.error("Errore durante l'iscrizione alla newsletter:", error);
            throw error;
        }
    }
}

const newsletter = new Newsletter();
export default newsletter;