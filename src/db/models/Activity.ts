import {prisma} from '@/lib/prisma'

class Activity {
    public async add(params: {
        title: string;
        time: number;
        date: string;
        eventId: number;
    }) {
        await prisma.activity.create({
            data: {
                title: params.title,
                time: parseInt(params.time.toString()),
                date: new Date(params.date),
                event: {
                    connect: {
                        id: parseInt(params.eventId.toString()),
                    }
                }
            }
        }).then((res) =>{
            return { res: `New activity created: ${res.toString()}`}
        })
    }

    public async getAllByUserId(id: number){
        const organizer = await prisma.organizer.findUnique({
            where: { userId: id },
        });
        if (!organizer) return [];
        return prisma.activity.findMany({
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

    public async getByEventId(id: number){
        return prisma.activity.findMany({where: {eventId: id}});
    }
}

const activity = new Activity();
export default activity;