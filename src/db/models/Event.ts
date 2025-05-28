import {prisma} from '@/lib/prisma'

interface EventCreateParams {
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    coordinates: string,
    category: string,
    image: string,
    topic: string,
    guideName: string,
    guideNumber: string,
    description: string
}

export interface EventInterface {
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    coordinates: string,
    categoryId: number,
    image: string,
    topic: string,
    guideName: string,
    guideNumber: string,
    description: string
}

class Event {
    public async add(params: EventCreateParams) {
        await prisma.event.create({
            data: {
                title: params.title,
                startDate: new Date(params.startDate),
                endDate: new Date(params.endDate),
                location: params.location,
                coordinates: params.coordinates,
                category: {
                    connect: {
                        id: parseInt(params.category),
                    }
                },
                image: params.image,
                topic: params.topic,
                guideName: params.guideName,
                guideNumber: params.guideNumber,
                description: params.description,
                status: "scheduled"
            }
        }).then((res) =>{
            return { res: `New event created: ${res.toString()}`}
        })
    }

    public async getAll(){
        return prisma.event.findMany();
    }
}

const event = new Event();
export default event;
