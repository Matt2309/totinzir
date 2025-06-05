import {prisma} from '@/lib/prisma'

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

    public async getAllByUserId(id){
        const transactions = await prisma.transaction.findMany({
            where: {
                id,
                status: "ok",
            },
            include: {
                order: {
                    include: {
                        tickets: true,
                    },
                },
            },
        });

        const tickets = transactions.flatMap(tr => tr.order.tickets);
        return tickets;
    }
}

const ticket = new Ticket();
export default ticket;
