import {prisma} from '@/lib/prisma'

class StandType {
    public async getAll(){
        return prisma.standType.findMany();
    }
}

const standType = new StandType();
export default standType;