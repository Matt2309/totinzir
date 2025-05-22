import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";

async function main() {
    const psw = await bcrypt.hash("1qaz2wsx!!", 10);

    const roles = [
        {
            title: "admin",
            users: {
                create: [
                    {
                        email: "superadmin@email.com",
                        password: psw,
                    },
                ],
            },
        },
        { title: "manager" },
        { title: "visitor" },
    ];

    for (const r of roles) {
        await prisma.role.create({ data: r });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
