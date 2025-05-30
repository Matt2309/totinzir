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
    description: string,
    city: string;
    street: string;
    zip: string;
    province: string;
    country: string;
}

export interface EventInterface {
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    coordinates: string,
    categoryId: number,
    addressId: number,
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
                address: {
                    create: {
                            street: params.street,
                            country: params.country,
                            province: params.province,
                            city: params.city,
                            zip: params.zip,
                    },
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

    public async getById(id: number){
        return prisma.event.findUnique({
            where: {
                id: parseInt(id.toString())
            },
            include: {
                category: true,
            }
        });
    }

    public async getAll(){
        return prisma.event.findMany();
    }
}

const event = new Event();
export default event;
