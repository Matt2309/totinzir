import {prisma} from "@/lib/prisma";
class Sponsor {
    public async add(params: {
        image: string;
        contactName: string;
        name: string;
        eventString: string;
        type: string;
        events: number[];
        budget: number
    }) {
        try{
            const result = await prisma.$transaction(async (tx) => {
                const newSponsor = await tx.sponsor.create({
                    data: {
                        name: params.name,
                        contact: params.contactName,
                        budget: parseFloat(params.budget.toString()),
                        logo: params.image,
                        type: params.type,
                    },
                });
                console.log("sponsor created within transaction: ", newSponsor);
                const eventIds = params.events.map((e: any) => parseInt(e.toString()));

                if (!eventIds || eventIds.length === 0) {
                    throw new Error("No events provided for sponsorship.");
                }

                for (const eventId of eventIds) {
                    await tx.sponsorship.create({
                        data: {
                            sponsorId: newSponsor.id,
                            eventId: eventId,
                        },
                    });
                    console.log(`Sponsorship created for event ID: ${eventId}`);
                }

                return newSponsor;
            });
            console.log("Transaction successful. Sponsor and sponsorships created.");
            return result;
        }catch (e) {
            console.log("Error: ", e)
            return { res: `Error: ${e.toString()}`}
        }

    }

    public async getAll(id: number) {
        return prisma.sponsor.findMany({
            where: {
                sponsorships: {
                    some: {
                        event: {
                            organizer: {
                                userId: id,
                            },
                        },
                    },
                },
            },
        });
    }

    public async getAllByEvent(id: number) {
        return prisma.sponsor.findMany({
            where: {
                sponsorships: {
                     some: {
                        event: {
                            id: parseInt(id.toString()),
                        }
                    }
                },
            },
        });
    }
}

const sponsor = new Sponsor();
export default sponsor;
