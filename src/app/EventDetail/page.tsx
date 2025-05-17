import Image from "next/image";
import Header from "../../components/Header"
import ActivityCard from "@/components/ActivityCard";
import TicketCard from "@/components/TicketCard";

export default function EventDetail() {
  return (
    <div>
        <main>
            <nav className="h-6/8 bg-[url(/landing_background.jpeg)] bg-cover bg-[position:0_-30em] pb-20">
                <Header/>
                <div className="pl-20 pr-20 mt-30">
                    <h1 className="text-white text-9xl text-center">Festa pazzesca</h1>
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
                            <label>GIO, 20 AGOSTO 2025</label>
                        </div>
                        <div className="flex align-middle gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <label>6:30PM</label>
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
                <label className="text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</label>

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