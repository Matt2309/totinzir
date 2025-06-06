import {prisma} from '@/lib/prisma'
import {getTicketTypesByUser} from "@/db/actions/getTicketTypesByUser";

class Ticket{
    public async add(params) {
        for (let i = 0; i<params.quantity; i++) {
            await prisma.ticket.create({
                data: {
                    firstName: params.firstName,
                    lastName: params.lastName,
                    format: "digital",
                    order: {
                        connect: {
                            id: params.orderId,
                        }
                    },
                    ticketType: {
                        connect: {
                            id: parseInt(params.ticketTypeId)
                        }
                    }
                }
            })
        }
        return { res: `Tickets added`}
    }

    public async getTotalRevenueUserId(id){
        let total = 0;
        const ticketTypes = await getTicketTypesByUser(id);
        for (const tt of ticketTypes) {
            const tickets = await prisma.ticket.findMany({
                where: {
                    ticketTypeId: tt.id
                }
            });
            total += tickets.length * tt.price;
        }
        return total;
    }
}

const ticket = new Ticket();
export default ticket;
