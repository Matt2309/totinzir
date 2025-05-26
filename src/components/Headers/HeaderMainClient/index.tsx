'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";
import { logout } from "@/db/actions/auth";

export default function HeaderClient({ user }: { user: string | null }) {
    const router = useRouter();

    const handleClick = async () => {
        if (user) {
            console.log("user: ",user)
            await logout();
            router.push('/');
        } else {
            router.push('/login');
        }
    };

    const handleDashboard = async () => {
        router.push('/dashboard/events');
    };

    return (
        <div className="pl-20 pr-20 pt-2 flex justify-between items-center pb-1 w-full bg-gradient-to-b from-black/50 to-transparent">
            <a href="/"><Image src="/logo_small_totinzir.svg" alt="header logo" width={100} height={66} /></a>
            <div className="flex gap-30 text-white">
                <label>HOME</label>
                <label>CHI SIAMO</label>
                <label>EXPERIENCE</label>
                <label>EVENTI</label>
            </div>
            <div className="flex gap-10 text-white z-10">
                <button
                    className="bg-[light-dark(var(--button_blue),var(--button_blue))] font-bold py-1 px-10 rounded-full cursor-pointer"
                    onClick={handleClick}
                >
                    {user ? "LOGOUT" : "LOGIN"}
                </button>
                <button
                    className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold py-1 px-5 rounded-full cursor-pointer"
                    onClick={handleDashboard}
                >
                    AREA RISERVATA
                </button>
            </div>
        </div>
    );
}
