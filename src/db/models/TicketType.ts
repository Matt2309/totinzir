import {prisma} from '@/lib/prisma'

interface TicketTypeCreateParams {
    title: string,
    maxAge: number,
    minAge: number,
    price: number,
    startDate: string,
    endDate: string,
    eventId: number,
    userId: number,
}

export interface TicketTypeInterface {
    title: string,
    maxAge: number,
    minAge: number,
    price: number,
    startDate: string,
    endDate: string,
    event: string,
}

class TicketType {
    public async add(params: TicketTypeCreateParams) {
        await prisma.ticketType.create({
            data: {
                title: params.title,
                maxAge: params.maxAge ? parseInt(params.maxAge.toString()) : null,
                minAge: params.minAge ? parseInt(params.minAge.toString()) : null,
                price: parseFloat(params.price.toString()),
                startDate: new Date(params.startDate),
                endDate: new Date(params.endDate),
                Organizer: {
                  connect: {
                      userId: parseInt(params.userId.toString()),
                  }
                },
                event: {
                    connect: {
                        id: parseInt(params.eventId.toString()),
                    }
                },
            }
        }).then((res) =>{
            return { res: `New category created: ${res.toString()}`}
        })
    }

    public async getAllByEvent(eventId){
        return prisma.ticketType.findMany({
            where: {
                eventId: eventId
            }
        });
    }

    public async getByOrganizerId(id: number){
        return prisma.ticketType.findUnique({where: {id: id}});
    }
}

const ticketType = new TicketType();
export default ticketType;