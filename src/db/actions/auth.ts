'use server'
import {SignInFormSchema, SignUpFormSchema, SigninFormState, SignupFormState} from '@/lib/definitions';
import {redirect} from "next/navigation";
import {createSession, deleteSession} from "@/lib/sessions";
import bcrypt from "bcrypt";
import User from "@/db/models/User";

export async function signIn(state: SigninFormState, formData: FormData) {
    let redirectLink;
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        await SignInFormSchema.validate({ email, password }, { abortEarly: false });

        const user = await User.findByEmail(email);
        const match = user && await bcrypt.compare(password, user.password);

        if (!user || !match) {
            return {
                errors: {
                    genericerror: ["Email o password non validi"],
                },
            };
        }

        await createSession(user.id);
        redirectLink = '/';

    } catch (error: any) {
        if (error?.name === "ValidationError") {
            const errors: Record<string, string[]> = {};
            error.inner.forEach((err: any) => {
                if (err.path) {
                    errors[err.path] = errors[err.path] || [];
                    errors[err.path].push(err.message);
                }
            });
            return { errors };
        }

        console.error("Unexpected error during signIn:", error);

        return {
            errors: {
                genericerror: ["Errore durante il login. Riprova più tardi."],
            },
        };
    } finally {
        if (redirectLink) {
            redirect(redirectLink);
        }
    }
}


export async function signUp(state: SignupFormState, formData: FormData) {
    let redirectLink;
    try {
        const firstname = formData.get('firstname') as string;
        const lastname = formData.get('lastname') as string;
        const phone = formData.get('phone') as string;
        const age = formData.get('age') as number;
        const fc = formData.get('fc') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const policy = formData.get('policy') as string;

        console.log("policy: ", policy)

        await SignUpFormSchema.validate({ firstname, lastname, phone, age, fc, email, password, policy }, { abortEarly: false });
        await User.add({
            fc: fc,
            age: age,
            firstname: firstname,
            lastname: lastname,
            policy: policy,
            email: email,
            phone: phone,
            password:password
        });
        redirectLink = '/login';
    } catch (error: any) {
        if (error?.name === "ValidationError") {
            const errors: Record<string, string[]> = {};
            error.inner.forEach((err: any) => {
                if (err.path) {
                    errors[err.path] = errors[err.path] || [];
                    errors[err.path].push(err.message);
                }
            });
            return { errors };
        }

        console.error("Unexpected error during signUp:", error);

        return {
            errors: {
                genericerror: ["Errore durante la registrazione. Riprova più tardi."],
            },
        };
    } finally {
        if (redirectLink) {
            redirect(redirectLink)
        }
    }
}
export async function logout() {
    await deleteSession()
    redirect('/')
}