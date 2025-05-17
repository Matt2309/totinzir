import Image from "next/image";
import HeaderMain from "../components/HeaderMain"
import EventCard from "@/components/EventCard";
export default function Home() {
  return (
    <div>
        <main>
            <nav className="h-6/8 bg-[url(/landing_background.jpeg)] bg-cover bg-[position:0_-20em] pb-20">
                <HeaderMain/>
                <div className="pl-20">
                    <h1 className="mt-40 text-white text-9xl w-3/5">Solo i migliori eventi in romagna</h1>
                    <h3 className="text-white text-2xl w-3/5">Scopri tutti i prossimi eventi ed esperienze che questa terra ha da offrire</h3>
                </div>
            </nav>
            <div className="mt-10 flex flex-col items-center">
                <Image src="/logo_totinzir.svg" alt="header logo" width={184} height={69}></Image>
                <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-2 dark:bg-black"/>
                <h2 className="text-4xl">Eventi in programma</h2>

                <div className="grid grid-cols-3 gap-x-25 gap-y-15 mt-10 mb-10">
                    <EventCard category={'Intrattenimento'} dayName={'GIO'} dayNum={10} time={'7:00 PM'} city={'Rimini'} title={'Festa pazzesca'}/>
                    <EventCard category={'Intrattenimento'} dayName={'GIO'} dayNum={10} time={'7:00 PM'} city={'Rimini'} title={'Festa pazzesca'}/>
                    <EventCard category={'Intrattenimento'} dayName={'GIO'} dayNum={10} time={'7:00 PM'} city={'Rimini'} title={'Festa pazzesca'}/>
                    <EventCard category={'Intrattenimento'} dayName={'GIO'} dayNum={10} time={'7:00 PM'} city={'Rimini'} title={'Festa pazzesca'}/>
                    <EventCard category={'Intrattenimento'} dayName={'GIO'} dayNum={10} time={'7:00 PM'} city={'Rimini'} title={'Festa pazzesca'}/>
                </div>
            </div>
        </main>
    </div>
  );
}