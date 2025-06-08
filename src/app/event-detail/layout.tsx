// app/special/layout.tsx
import '@/app/globals.css';
import {verifySession} from "@/lib/dal";
import {UserProvider} from "@/context/UserContext";

export default async function SpecialLayout({children}: { children: React.ReactNode }) {
    const session = await verifySession();
    const user = session?.userId;
    return (
        <div className="bg-detail min-h-screen">
            <UserProvider userId={user}>
                {children}
            </UserProvider>
        </div>
    );
}
