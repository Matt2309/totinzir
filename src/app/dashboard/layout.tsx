// app/special/layout.tsx
import '@/app/globals.css';
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "@/components/HeaderDashboard";

export default function SpecialLayoutDashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-detail">
            {/* Sidebar fissa */}
            <Sidebar />

            {/* Contenuto a destra della sidebar */}
            <div className="flex flex-col flex-1 overflow-auto ml-64">
                {/* Header */}
                <HeaderDashboard />

                {/* Contenuto dinamico della pagina */}
                <main className="p-4 pt-[6rem]">
                    {children}
                </main>
            </div>
        </div>
    );
}
