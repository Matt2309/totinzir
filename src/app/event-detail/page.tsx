'use client'
import Image from "next/image";
import Header from "../../components/Headers/Header"
import ActivityCard from "@/components/ActivityCard";
import TicketCard from "@/components/TicketCard";
import {getEventWithCategory} from "@/db/actions/getEventById";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {formatAMPM, getDayName} from "@/lib/utils";

const fetchEvent = async (id): Promise<any> => {
    try {
        const event = await getEventWithCategory(id);
        console.log("event: ",event)
        return event;
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return null;
    }
};

export default function EventDetail() {
    const searchParams = useSearchParams()
    const [event, setEvent] = useState<any>(null);
    useEffect(() => {
        const eventId = searchParams.get('eventId');

        fetchEvent(eventId).then(res => {
            setEvent(res || null)});
    }, []);

    if (!event) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Caricamento evento in corso...</p>
            </div>
        );
    }

  return (
    <div>
        <main>
            <nav className="h-6/8 bg-[url(/landing_background.jpeg)] bg-cover bg-[position:0_-30em] pb-20">
                <Header/>
                <div className="pl-20 pr-20 mt-30">
                    <h1 className="text-white text-9xl text-center">{event.title}</h1>
                    <h3 className="text-white text-2xl text-center">event organizer</h3>
                </div>
            </nav>
            <nav className="bg-white p-10 pl-50 pr-50 flex justify-between">
                <div className="flex gap-10">
                    <div>
                        <div className="flex align-middle gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                            <label>{getDayName(event.startDate)}, {event.startDate.toLocaleDateString()}</label>
                        </div>
                        <div className="flex align-middle gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <label>{formatAMPM(event.startDate)}</label>
                        </div>
                    </div>
                    <div className="block">
                        <label className="text-sm">prezzo</label>
                        <br/>
                        <label>€5 - €10</label>
                    </div>
                </div>
                <button className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold py-0.5 px-20 rounded-md text-white">
                    BIGLIETTI
                </button>
            </nav>
            <nav className="p-10 pl-50 pr-50">
                <h1 className="text-3xl text-gray-800">DESCRIZIONE EVENTO</h1>
                <label className="text-gray-500">{event.description}</label>

                <div className="flex flex-col items-center mt-20">
                    <h1 className="text-4xl text-gray-800">biglietti</h1>
                    <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>
                    <div className="bg-white p-10 w-3/4 rounded-xl mt-5 flex flex-col gap-y-5">
                        <TicketCard title={'Intero'} price={20}/>
                        <TicketCard title={'Intero'} price={20}/>
                    </div>

                    <h1 className="text-4xl text-gray-800 mt-10">attività</h1>
                    <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>

                    <div className="grid grid-cols-3 gap-x-25 gap-y-15 mt-5 mb-10">
                        <ActivityCard dayName={'GIO'} dayNum={10} time={'7:00pm'} title={'nullafacismo'}/>
                        <ActivityCard dayName={'GIO'} dayNum={10} time={'7:00pm'} title={'nullafacismo'}/>
                        <ActivityCard dayName={'GIO'} dayNum={10} time={'7:00pm'} title={'nullafacismo'}/>
                    </div>

                    <h1 className="text-4xl text-gray-800 mt-10">sponsor</h1>
                    <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>
                    <h1 className="text-2xl text-gray-800 mt-10">main</h1>
                    <div className="grid grid-cols-3 gap-x-25 gap-y-15 mt-5 mb-10">
                        <Image src="/logo_small_totinzir.svg" alt="header logo" width={100} height={66}></Image>
                        <Image src="/logo_small_totinzir.svg" alt="header logo" width={100} height={66}></Image>
                        <Image src="/logo_small_totinzir.svg" alt="header logo" width={100} height={66}></Image>
                    </div>
                    <h1 className="text-2xl text-gray-800">silver</h1>
                    <div className="grid grid-cols-3 gap-x-25 gap-y-15 mt-5 mb-10">
                        <Image src="/logo_small_totinzir.svg" alt="header logo" width={100} height={66}></Image>
                        <Image src="/logo_small_totinzir.svg" alt="header logo" width={100} height={66}></Image>
                    </div>
                </div>
            </nav>
        </main>
    </div>
  );
}