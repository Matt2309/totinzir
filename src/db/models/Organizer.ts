import {prisma} from "@/lib/prisma";

interface OrganizerCreateParams {
    email: String,
    companyName: String,
    vatNumber: String,
}

class Organizer {
    public async add({ email, companyName, vatNumber }: OrganizerCreateParams) {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
                select: { id: true },
            });
            if (!user) {
                throw new Error(`Utente con email ${email} non trovato. Impossibile creare/aggiornare l'organizzatore.`);
            }
            const organizer = await prisma.organizer.upsert({
                where: {
                    userId: user.id,
                },
                update: {
                    companyName: companyName,
                    vatNumber: vatNumber,
                },
                create: {
                    companyName: companyName,
                    vatNumber: vatNumber,
                    user: {
                        connect: { id: user.id },
                    },
                },
            });
            return {
                res: `Organizzatore per utente ${email} creato/aggiornato: ${organizer.id}`
            };
        } catch (error) {
            console.error(`Errore durante l'upsert dell'organizzatore:`, error);
            throw error;
        }
    }

    public async getAll() {
        return prisma.organizer.findMany({
            where: {
                user: {
                    is: {
                        role: {
                            is: {
                                title: "manager"
                            }
                        }
                    }
                }
            },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        });
    }
}

const organizer = new Organizer();
export default organizer;
