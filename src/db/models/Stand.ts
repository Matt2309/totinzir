import {prisma} from '@/lib/prisma'

interface StandCreateParams {
    name: string;
    logo: string;
    position: string;
    origin: string;
    typeId: number;
    eventId: number;
}

class Stand {
    public async add(params: StandCreateParams) {
        try {
            const result = await prisma.$transaction(async (tx) => {
                // 1. Crea il nuovo stand
                const newStand = await tx.stand.create({
                    data: {
                        name: params.name,
                        logo: params.logo,
                        position: params.position,
                        origin: params.origin,
                        type: {
                            connect: {
                                id: params.typeId,
                            },
                        },
                    },
                });

                await tx.exhibition.create({
                    data: {
                        stand: {
                            connect: {
                                id: newStand.id,
                            }
                        },
                        event: {
                            connect: {
                                id: params.eventId,
                            }
                        }
                    },
                });

                return newStand;
            });

            return { res: `Nuovo stand creato e collegato all'evento: ${result.id}` };
        } catch (error) {
            console.error("Errore durante la creazione dello stand o della relazione Exhibition:", error);
            throw error;
        }
    }
    public async getAllByUserId(userId: number) {
        try {
            const organizer = await prisma.organizer.findUnique({
                where: {userId: userId},
            });

            return await prisma.stand.findMany({
                where: {
                    exhibitions: {
                        some: {
                            event: {
                                organizerId: organizer.id,
                            },
                        },
                    },
                },
                include: {
                    type: true,
                    exhibitions: {
                        include: {
                            event: true,
                        },
                    },
                },
            });
        } catch (error) {
            console.error(`Errore nel recupero degli stand per l'utente ${userId}:`, error);
            throw new Error("Impossibile recuperare gli stand per l'utente specificato.");
        }
    }

    public async getAllByEventId(eventId: number) {
        try {
            return prisma.stand.findMany({
                where: {
                    exhibitions: {
                        some: {
                            eventId: eventId,
                        },
                    },
                },
                include: {
                    type: true,
                    exhibitions: {
                        where: {
                            eventId: eventId,
                        },
                    },
                },
            });
        } catch (error) {
            console.error(`Errore nel recupero degli stand per l'evento ${eventId}:`, error);
            throw new Error("Impossibile recuperare gli stand per l'evento specificato.");
        }
    }
}

const stand = new Stand();
export default stand;