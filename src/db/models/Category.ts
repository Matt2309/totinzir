import {prisma} from '@/lib/prisma'

interface CategoryCreateParams {
    title: string,
    difficulty: string,
    duration: number,
}

export interface CategoryInterface {
    id: number,
    duration: number,
    difficulty: string,
}

class Category {
    public async add(params: CategoryCreateParams) {
        await prisma.category.create({
            data: {
                title: params.title,
                difficulty: params.difficulty,
                duration: parseInt(params.duration.toString()),
            }
        }).then((res) =>{
            return { res: `New category created: ${res.toString()}`}
        })
    }

    public async getAll(){
        return prisma.category.findMany();
    }

    public async getById(id: number){
        return prisma.category.findUnique({where: {id: id}});
    }
}

const category = new Category();
export default category;