import {prisma} from '@/lib/prisma'

interface CategoryCreateParams {
    title: string,
    difficulty: string,
    duration: number,
    userId: number,
}

export interface CategoryInterface {
    id: number,
    duration: number | null,
    difficulty: string,
    userId: number,
}

class Category {
    public async add(params: CategoryCreateParams) {
        await prisma.category.create({
            data: {
                title: params.title,
                difficulty: params.difficulty,
                duration: parseInt(params.duration.toString()),
                Organizer: {
                    connect: {
                        userId: params.userId
                    }
                }
            }
        }).then((res) =>{
            return { res: `New category created: ${res.toString()}`}
        })
    }

    public async getAllByUserId(id: number){
        console.log("userid: ", id)
        const organizer = await prisma.organizer.findUnique({
            where: { userId: id },
        });
        if (!organizer) return [];
        return prisma.category.findMany({
            where: {
                organizerId: organizer.id
            }
        });
    }

    public async getById(id: number){
        return prisma.category.findUnique({where: {id: id}});
    }
}

const category = new Category();
export default category;