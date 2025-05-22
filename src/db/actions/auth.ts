'use server'
import {SignInFormSchema, FormState} from '@/lib/definitions';
import {redirect} from "next/navigation";
import {createSession, deleteSession} from "@/lib/sessions";
import bcrypt from "bcrypt";
import { prisma } from '@/lib/prisma'

export async function signIn(state: FormState, formData: FormData) {
    let redirectLink;
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        await SignInFormSchema.validate({ email, password }, { abortEarly: true });


        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { message: "Invalid username or password" };
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Login failed: ");
            return { message: "Invalid username or password" };
        }else {
            await createSession(user.id);
            redirectLink = '/';
        }
    } catch (error) {
        if (error.inner) {
            const errors: { email?: string[]; password?: string[] } = {};

            error.inner.forEach((err) => {
                if (err.path && (err.path === 'email' || err.path === 'password')) {
                    errors[err.path] = errors[err.path] || [];
                    errors[err.path]!.push(err.message);
                }
            });
            return {errors};
        }
        console.log("Unexpected error: ", error);
        return { message: "An unexpected error occurred" };
    } finally {
        if (redirectLink) {
            redirect(redirectLink);
        }
    }
}
export async function logout() {
    await deleteSession()
    redirect('/')
}