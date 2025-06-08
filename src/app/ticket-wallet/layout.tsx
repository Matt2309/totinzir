import '@/app/globals.css';
import {UserProvider} from "@/context/UserContext";
import {verifySession} from "@/lib/dal";
import {redirect} from "next/navigation";

export default async function SpecialLayout({children}: { children: React.ReactNode }) {
    const session = await verifySession();
    const user = session?.userId;
    if (!user) {
        redirect('/login')
        return;
    }
    return (
        <div className="bg-detail min-h-screen">
            <UserProvider userId={user}>
                {children}
            </UserProvider>
        </div>
    );
}
