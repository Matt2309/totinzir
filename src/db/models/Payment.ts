import {prisma} from '@/lib/prisma'

class PaymentMethod {
    public async add(params) {
        await prisma.paymentMethod.create({
            data: {
                cardNumber: params.cardNumber,
                expiryDate: new Date(params.expiryDate),
                cvv: params.cvv,
                user: {
                    connect: {
                        id: params.userId
                    }
                }
            }
        }).then((res) =>{
            return { res: `New payment method added: ${res.toString()}`}
        })
    }

    public async getByUserId(id){
        return prisma.paymentMethod.findMany({
            where: {
                userId: id
            }
        });
    }
}

const paymentMethod = new PaymentMethod();
export default paymentMethod;
