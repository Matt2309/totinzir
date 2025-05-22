// app/special/layout.tsx
import '@/app/globals.css';
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "@/components/HeaderDashboard";
import {verifySession} from "@/lib/dal";
import {redirect} from "next/navigation";

export default async function SpecialLayoutDashboard({ children }: { children: React.ReactNode }) {
    const session = await verifySession();
    const user = session?.userId;
    if (!user) {
        redirect('/login')
    }else {
        return (
            <div className="flex h-screen overflow-hidden bg-detail">
                {/* Sidebar fissa */}
                <Sidebar />

                {/* Contenuto a destra della sidebar */}
                <div className="flex flex-col flex-1 overflow-auto ml-64">
                    {/* Header */}
                    <HeaderDashboard />

                    {/* Contenuto dinamico della pagina */}
                    <main className="pt-30 pl-15">
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}
