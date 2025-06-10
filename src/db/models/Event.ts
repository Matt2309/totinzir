import {prisma} from '@/lib/prisma'

interface EventCreateParams {
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    coordinates: string,
    category: string,
    image: string,
    topic: string,
    guideName: string,
    guideNumber: string,
    description: string,
    city: string;
    street: string;
    zip: string;
    province: string;
    country: string;
    userId: number;
}

export interface EventInterface {
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    coordinates: string,
    categoryId: number,
    addressId: number,
    image: string,
    topic: string,
    guideName: string,
    guideNumber: string,
    description: string
}

class Event {
    public async add(params: EventCreateParams) {
        await prisma.event.create({
            data: {
                title: params.title,
                startDate: new Date(params.startDate),
                endDate: new Date(params.endDate),
                location: params.location,
                coordinates: params.coordinates,
                category: {
                    connect: {
                        id: parseInt(params.category),
                    }
                },
                address: {
                    create: {
                            street: params.street,
                            country: params.country,
                            province: params.province,
                            city: params.city,
                            zip: params.zip,
                    },
                },
                organizer: {
                    connect: {
                        userId: params.userId,
                    }
                },
                image: params.image,
                topic: params.topic,
                guideName: params.guideName,
                guideNumber: params.guideNumber,
                description: params.description,
                status: "scheduled"
            }
        }).then((res) =>{
            return { res: `New event created: ${res.toString()}`}
        })
    }

    public async delete(eventId: number) {
        try {
            const result = await prisma.$transaction(async (tx) => {
                const eventToDelete = await tx.event.findUnique({
                    where: { id: eventId },
                    include: {
                        ticketTypes: {
                            include: {
                                tickets: true,
                            },
                        },
                    },
                });

                if (!eventToDelete) {
                    throw new Error(`L'evento con ID ${eventId} non è stato trovato.`);
                }

                let totalRevenue = 0.0;
                let totalTicketsSold = 0;

                eventToDelete.ticketTypes.forEach(ticketType => {
                    totalTicketsSold += ticketType.tickets.length;
                    totalRevenue += ticketType.price * ticketType.tickets.length;
                });


                await tx.eventHistory.create({
                    data: {
                        title: eventToDelete.title,
                        startDate: eventToDelete.startDate,
                        endDate: eventToDelete.endDate,
                        location: eventToDelete.location,
                        status: eventToDelete.status,
                        coordinates: eventToDelete.coordinates,
                        image: eventToDelete.image,
                        description: eventToDelete.description,
                        revenue: totalRevenue,
                        ticketsSold: totalTicketsSold,
                    },
                });

                //elimino tutti i biglietti di quell'evento
                const ticketTypeIds = eventToDelete.ticketTypes.map(tt => tt.id);
                if (ticketTypeIds.length > 0) {
                    await tx.ticket.deleteMany({
                        where: {
                            ticketTypeId: {
                                in: ticketTypeIds,
                            },
                        },
                    });
                }

                // Elimina tutte le TicketType associate a questo evento
                await tx.ticketType.deleteMany({
                    where: { eventId: eventId },
                });

                // Elimina tutte le Sponsorship
                await tx.sponsorship.deleteMany({
                    where: { eventId: eventId },
                });

                // Elimina tutti i DiscountCode
                await tx.discountCode.deleteMany({
                    where: { eventId: eventId },
                });

                // Elimina tutte le Exhibition associate a questo evento
                await tx.exhibition.deleteMany({
                    where: { eventId: eventId },
                });

                // Elimina tutte le activity
                await tx.activity.deleteMany({
                    where: { eventId: eventId },
                });

                // scollega le review
                await tx.review.updateMany({
                    where: { eventId: eventId },
                    data: { eventId: null },
                });

                // Imposta a NULL l'eventId per tutte le Newsletter associate a questo evento
                await tx.newsletter.updateMany({
                    where: { eventId: eventId },
                    data: { eventId: null },
                });

                // Elimina evento
                return tx.event.delete({
                    where: {id: eventId},
                });
            });

            return { success: true, message: `Evento "${result.title}" (ID: ${result.id}) eliminato con successo.` };
        } catch (error: any) {
            console.error(`Errore durante l'eliminazione dell'evento con ID ${eventId}:`, error);
            if (error.code === 'P2025') {
                throw new Error(`L'evento con ID ${eventId} non è stato trovato.`);
            }
            throw new Error("Si è verificato un errore durante l'eliminazione dell'evento. Riprova più tardi.");
        }
    }

    public async getById(id: number){
        return prisma.event.findUnique({
            where: {
                id: parseInt(id.toString())
            },
            include: {
                category: true,
                organizer: true,
            }
        });
    }

    public async getAll(){
        return prisma.event.findMany({include: {
                organizer: true,
            }});
    }

    public async getByUserId(id: number){
        const organizer = await prisma.organizer.findUnique({
            where: { userId: id },
        });

        if (!organizer) return [];

        return prisma.event.findMany({
            where: {
                organizerId: organizer.id
            },
        });
    }
}

const event = new Event();
export default event;
