// app/special/layout.tsx
import '@/app/globals.css';
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "../../components/Headers/HeaderDashboard";
import {verifySession} from "@/lib/dal";
import {redirect} from "next/navigation";
import User from "@/db/models/User";

export default async function SpecialLayoutDashboard({ children }: { children: React.ReactNode }) {
    const session = await verifySession();
    const user = session?.userId;
    if (!user) {
        redirect('/login')
        return;
    }
    const role = await User.getRole(user);
    const titleRole = role.title;

    if (user && (titleRole === 'admin' || titleRole === 'manager')) {
        return (
            <div className="flex h-screen overflow-hidden bg-detail">
                {/* Sidebar fissa */}
                <Sidebar userId={user}/>

                {/* Contenuto a destra della sidebar */}
                <div className="flex flex-col flex-1 overflow-auto ml-64">
                    {/* Header */}
                    <HeaderDashboard />

                    {/* Contenuto dinamico della pagina */}
                    <main className="pt-30 pl-15 pr-15">
                        {children}
                    </main>
                </div>
            </div>
        );
    }else {
        redirect('/login')
    }
}
