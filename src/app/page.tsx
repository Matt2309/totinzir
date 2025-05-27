'use client'
import Image from "next/image";
import HeaderMain from "../components/Headers/HeaderMain"
import EventCard from "@/components/EventCard";
import {useEffect, useState} from "react";
import {getEventList} from "@/db/actions/getEventList";

const fetchEvent = async (): Promise<any> => {
    try {
        return getEventList();
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return [];
    }
};
export default function Home() {
    const [eventList, setEventList] = useState([]);
    useEffect(() => {
        fetchEvent().then(res => {
            console.log(res);
            setEventList(res || [])});
    }, []);
    function getDayName(data) {
        const days = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
        return days[data.getDay()];
    }
    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
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
                        <EventCard key={index} category={event.type} dayName={getDayName(event.startDate)} dayNum={event.startDate.getDate()} time={formatAMPM(event.startDate)} city={event.location} title={event.title} img={event.image}/>
                    ))}
                </div>
            </div>
        </main>
    </div>
  );
}