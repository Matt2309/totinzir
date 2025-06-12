import {prisma} from '@/lib/prisma'

interface DiscountCodeCreateParams {
    code: string;
    name: string;
    discountPerc: number;
    eventId: number;
}

class DiscountCode {
    public async add(params: DiscountCodeCreateParams) {
        try {
            await prisma.discountCode.create({
                data: {
                    code: params.code,
                    name: params.name,
                    discountPerc: params.discountPerc,
                    event: {
                        connect: {
                            id: params.eventId,
                        },
                    },
                },
            }).then((res) => {
                return { res: `Codice sconto creato: ${res.code}` };
            });
        } catch (error) {
            if ((error as any).code === 'P2002' && (error as any).meta?.target?.includes('code')) {
                console.error("Tentativo di creare codice sconto con codice duplicato:", params.code);
                throw new Error("Il codice sconto specificato esiste già. Scegli un codice diverso.");
            }
            console.error("Errore durante la creazione del codice sconto:", error);
            throw error;
        }
    }

    public async getAll() {
        return prisma.discountCode.findMany({
            include: { event: true },
        });
    }

    public async getByCode(code: string) {
        return prisma.discountCode.findUnique({
            where: { code: code },
            include: { event: true },
        });
    }

    public async getAllByUserId(id: number){
        const organizer = await prisma.organizer.findUnique({
            where: { userId: id },
        });
        if (!organizer) return [];
        return prisma.discountCode.findMany({
            where: {
                event: {
                    organizer: {
                        userId: id,
                    },
                },
            },
            include: {
                event: true,
            }
        });
    }
}

const discountCode = new DiscountCode();
export default discountCode;