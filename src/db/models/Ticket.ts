import {prisma} from '@/lib/prisma'
import {getTicketTypesByUser} from "@/db/actions/getTicketTypesByUser";

class Ticket {
    public async add(params) {
        for (let i = 0; i < params.quantity; i++) {
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
        return {res: `Tickets added`}
    }

    public async getUserTickets(id) {
        return prisma.ticket.findMany({
            where: {
                order: {
                    Transaction: {
                        userId: id,
                    },
                },
            },
            include: {
                ticketType: {
                    include: {
                        event: true
                    }
                }
            }
        });
    }

    public async getTotalRevenueByUserId(userId: number){
        const result = await prisma.$queryRaw<{ totalRevenue: number }[]>`
            SELECT
                SUM(TT.price) AS "totalRevenue"
            FROM
                "public"."User" AS U
                    JOIN
                "public"."Organizer" AS O ON U.id = O."userId"
                    JOIN
                "public"."TicketType" AS TT ON O.id = TT."organizerId"
                    JOIN
                "public"."Ticket" AS T ON TT.id = T."ticketTypeId"
            WHERE
                U.id = ${userId};
            `;
            return result[0]?.totalRevenue ?? 0;
    }

}

const ticket = new Ticket();
export default ticket;
