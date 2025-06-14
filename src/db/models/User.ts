import {prisma} from '@/lib/prisma'
import {hash} from "bcrypt";

interface UserCreateParams {
    fc: String,
    age: Number,
    firstname: String,
    lastname: String,
    policy: String,
    email: String,
    phone: String,
    password: String,
}

class User {
    public async add({fc, age, firstname, lastname, policy, email, phone, password}: UserCreateParams) {
        await prisma.registry.create({
            data: {
                fiscalCode: fc,
                age: Number(age),
                firstName: firstname,
                lastName: lastname,
                policy: policy,
                user: { create: {
                        email: email,
                        phone: phone,
                        password: await hash(password, 8),
                        fiscalCode: fc,
                        role: { connect: { title: "visitor" } }, // solo se title è @unique
                    }},
            }
        }).then((res) =>{
            return { res: `New user created: ${res.toString()}`}
        })
    }
    public async findById(userId: Number) {
        return prisma.user.findUnique({where: {id: userId}});
    }
    public async findByEmail(email: String) {
        return prisma.user.findUnique({where: {email: email}});
    }
    public async getRole(userId: number) {
        const user = await this.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        return prisma.role.findUnique({
            where: {
                id: user.roleId,
            },
        });
    }

    public async upgradeRoleToOrganizer(email: string) {
        return prisma.user.update({
            where: {
                email: email,
            },
            data: {
                role: {
                    connect: {
                        title: 'manager'
                    }
                },
            },
        })
    }

    public async downgradeRoleToVisitor(email: string) {
        return prisma.user.update({
            where: {
                email: email,
            },
            data: {
                role: {
                    connect: {
                        title: 'visitor'
                    }
                },
            },
        })
    }

}

const user = new User();
export default user;
