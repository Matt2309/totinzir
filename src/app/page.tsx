'use client'
import Image from "next/image";
import HeaderMain from "../components/Headers/HeaderMain"
import EventCard from "@/components/EventCard";
import {useEffect, useState} from "react";
import {getEventList} from "@/db/actions/getEventList";
import {EventInterface} from "@/db/models/Event";
import {getCategoryById} from "@/db/actions/getCategoryById";
import Link from "next/link";
import {formatAMPM, getDayName} from "@/lib/utils";
const fetchEvent = async (): Promise<any> => {
    try {
        const eventList:EventInterface[] = await getEventList();
        for (const ev of eventList) {
            let category = await getCategoryById(ev.categoryId);
            ev["categoryName"] = category.title;
        }
        return eventList;
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};
export default function Home() {
    const [eventList, setEventList] = useState([]);
    useEffect(() => {
        fetchEvent().then(res => {
            setEventList(res || [])});
    }, []);
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
                    {eventList.map((event, index) => (
                        <Link key={index} href={{
                            pathname: `/event-detail`,
                            query: {
                                eventId: event.id
                            }
                        }}>
                            <EventCard key={index} category={event.categoryName} dayName={getDayName(event.startDate)} dayNum={event.startDate.getDate()} time={formatAMPM(event.startDate)} city={event.location} title={event.title} img={event.image}/>
                        </Link>
                ))}
                </div>
            </div>
        </main>
    </div>
  );
}