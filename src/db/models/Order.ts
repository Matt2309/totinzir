import {prisma} from '@/lib/prisma'

class Order {
    public async add(params) {
        return prisma.transaction.create({
            data: {
                date: new Date(),
                amount: parseFloat(params.amount),
                status: "ok",
                user: {
                    connect: {
                        id: params.userId,
                    },
                },
                order: {
                    create: {
                        date: new Date(),
                        total: parseFloat(params.amount),
                        commission: parseFloat(params.commission),
                    },
                },
            },
        })
    }
}

const order = new Order();
export default order;
