import {prisma} from '@/lib/prisma'

interface ReviewCreateParams {
    title: string;
    description: string;
    stars: number;
    purchased: boolean;
    userId: number;
    eventId?: number;
}

class Review {
    public async add(params: ReviewCreateParams) {
        await prisma.review.create({
            data: {
                title: params.title,
                description: params.description,
                stars: params.stars,
                purchased: params.purchased,
                user: {
                    connect: {
                        id: params.userId,
                    },
                },
                ...(params.eventId && {
                    event: {
                        connect: {
                            id: params.eventId,
                        },
                    },
                }),
            },
        }).then((res) => {
            return { res: `Nuova recensione creata: ${res.id}` };
        });
    }

    public async getAllByEventId(eventId: number) {
        return prisma.review.findMany({
            where: { eventId: eventId },
            include: { user: true },
        });
    }
}

const review = new Review();
export default review;