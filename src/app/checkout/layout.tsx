// app/special/layout.tsx
import '@/app/globals.css';
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
            {children}
        </div>
    );
}
