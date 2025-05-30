import {prisma} from "@/lib/prisma";

interface OrganizerCreateParams {
    email: String,
    companyName: String,
    vatNumber: String,
}

class Organizer {
    public async add({email, companyName, vatNumber}: OrganizerCreateParams) {

        await prisma.organizer.create({
            data: {
                companyName: companyName,
                vatNumber: vatNumber,
                user: {
                    connect: { email: email }
                }
            }
        }).then((res) => {
            return {res: `New user created: ${res.toString()}`}
        })
    }

    public async getAll() {
        return prisma.organizer.findMany({include: {
                user: true,
            }});
    }
}

const organizer = new Organizer();
export default organizer;
