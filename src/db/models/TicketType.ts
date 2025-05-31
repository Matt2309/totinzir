import {prisma} from '@/lib/prisma'

interface TicketTypeCreateParams {
    title: string,
    maxAge: number,
    minAge: number,
    price: number,
    startDate: string,
    endDate: string,
    eventId: number,
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
                maxAge: parseInt(params.maxAge.toString()),
                minAge: parseInt(params.minAge.toString()),
                price: parseFloat(params.price.toString()),
                startDate: new Date(params.startDate),
                endDate: new Date(params.endDate),
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

    public async getAll(){
        return prisma.ticketType.findMany({
            include: {
                event: true
            }
        });
    }

    public async getById(id: number){
        return prisma.ticketType.findUnique({where: {id: id}});
    }
}

const ticketType = new TicketType();
export default ticketType;