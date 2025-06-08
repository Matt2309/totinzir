'use client'
import Image from "next/image";
import ActivityCard from "@/components/ActivityCard";
import TicketCard from "@/components/TicketCard";
import {getEventWithCategoryAndTicket} from "@/db/actions/getEventWithCategoryAndTicketById";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {formatAMPM, getDayName} from "@/lib/utils";
import HeaderMain from "@/components/Headers/HeaderMain";
import {getEventSponsorList} from "@/db/actions/getEventSponsorList";
import {getActivitySponsorList} from "@/db/actions/getEventActivityList";
import CircleTag from "@/components/CircleTag";
import {AddReviewModal} from "@/components/AddReviewModal";
import {getReviewList} from "@/db/actions/getReviewList";
import ReviewCard from "@/components/ReviewCard";
import {useUser} from "@/context/UserContext";
import {getStandByEvent} from "@/db/actions/getStandByEvent";

const fetchEvent = async (id): Promise<any> => {
    try {
        const event = await getEventWithCategoryAndTicket(id);
        console.log("event: ",event)
        return event;
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return null;
    }
};
const fetchSponsor = async (id): Promise<any> => {
    try {
        return await getEventSponsorList(id);
    } catch (error) {
        console.error(`Errore nel recupero sponsor`, error);
        return null;
    }
};

const fetchStands = async (id): Promise<any> => {
    try {
        return await getStandByEvent(id);
    } catch (error) {
        console.error(`Errore nel recupero stands`, error);
        return null;
    }
};
const fetchActivity = async (id: number): Promise<any> => {
    try {
        return await getActivitySponsorList(id);
    } catch (error) {
        console.error(`Errore nel recupero attività`, error);
        return null;
    }
};

const fetchReviews = async (id: number): Promise<any> => {
    try {
        return await getReviewList(id);
    } catch (error) {
        console.error(`Errore nel recupero recensioni`, error);
        return null;
    }
};
export default function EventDetail() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [event, setEvent] = useState<any>(null);
    const [sponsors, setSponsors] = useState<any>([]);
    const [activities, setActivities] = useState<any>([]);
    const [reviews, setReviews] = useState<any>([]);
    const [stands, setStands] = useState<any>([]);

    const [selectedTickets, setSelectedTickets] = useState({});
    const { userId } = useUser();


    const handleQuantityChange = useCallback((ticketId, title, quantity, price) => {
        setSelectedTickets(prevSelectedTickets => {
            const updatedTickets = { ...prevSelectedTickets };
            const eventId = searchParams.get('eventId');
            if (quantity > 0) {
                updatedTickets[ticketId] = { title, quantity, price, eventId };
            } else {
                delete updatedTickets[ticketId];
            }
            return updatedTickets;
        });
    }, []);

    useEffect(() => {
        const eventId = searchParams.get('eventId');

        fetchEvent(eventId).then(res => {
            setEvent(res || null)});

        fetchSponsor(eventId).then(res => {
            setSponsors(res || null)
        });

        fetchActivity(parseInt(eventId.toString())).then(res => {
            setActivities(res || null)
        });

        fetchReviews(parseInt(eventId.toString())).then(res => {
            setReviews(res || null)
        });

        fetchStands(parseInt(eventId.toString())).then(res => {
            setStands(res || null)
        });
    }, []);

    useEffect(() => {
        console.log("Updated reviews state: ", reviews);
    }, [reviews]); // This useEffect will run whenever 'reviews' changes

    const handleCheckout = () => {
        try {
            console.log("event: ",selectedTickets)
            const encodedData = encodeURIComponent(JSON.stringify(selectedTickets));
            router.push(`/checkout?data=${encodedData}`);
        } catch (error) {
            console.error(`Errore nel recupero biglietti`, error);
            return null;
        }
    };

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
                <HeaderMain/>
                <div className="pl-20 pr-20 mt-30">
                    <h1 className="text-white text-9xl text-center">{event.title}</h1>
                    <h3 className="text-white text-2xl text-center">{event.organizer.companyName}</h3>
                </div>
            </nav>
            <nav className="bg-white p-5 pl-50 pr-50 flex justify-between items-center">
                <div className="flex gap-10 items-center">
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
                    <hr className="w-0.5 h-15 mx-auto bg-gray-500 border-0 rounded-sm md:my-1"/>
                    <CircleTag text={event.category.title}></CircleTag>
                    {(event.guideName || event.guideNumber) ?
                        <div className="block">
                            <label className="text-sm">CONTATTI GUIDA:</label>
                            <br/>
                            <label className="text-xl">{event.guideName ? event.guideName : ""} - {event.guideNumber ? event.guideNumber : ""}</label>
                        </div>
                        : <></>
                    }

                </div>

                <button className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold h-10 px-20 rounded-md text-white">
                    <a href="#tickets">
                        BIGLIETTI
                    </a>
                </button>
            </nav>
            <nav className="p-10 pl-50 pr-50">
                <h1 className="text-3xl text-gray-800">DESCRIZIONE EVENTO</h1>
                <label className="text-gray-500">{event.description}</label>

                <div className="flex flex-col items-center mt-20">
                    <h1 className="text-4xl text-gray-800" id="tickets">biglietti</h1>
                    <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>
                    <div className="bg-white p-10 w-3/4 rounded-xl mt-5 flex flex-col gap-y-5">
                        {event.ticketTypes.map((ticket, index) => (
                            <TicketCard key={index}
                                        id={ticket.id}
                                        title={ticket.title}
                                        price={ticket.price}
                                        minAge={ticket.minAge}
                                        maxAge={ticket.maxAge}
                                        onQuantityChange={handleQuantityChange}
                            />
                        ))}
                        {event.ticketTypes.length > 0 ?
                            <div className="flex justify-end mt-5">
                                <button disabled={Object.keys(selectedTickets).length === 0} className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold py-1 px-20 rounded-md text-white"
                                onClick={handleCheckout}>
                                    ACQUISTA
                                </button>
                            </div> :
                            <div className="flex justify-center">
                                <h1 className="text-xl text-gray-600">Biglietti non disponibili</h1>
                            </div>
                        }
                    </div>

                    {activities.length > 0 ?
                        <>
                            <h1 className="text-4xl text-gray-800 mt-10">attività</h1>
                            <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>
                        </>
                        : <></>
                    }
                    <div className="flex flex-wrap justify-center gap-6 mt-5 mb-10">
                        {activities.map((activity, index) => (
                            <ActivityCard key={index} dayName={getDayName(activity.date)} dayNum={activity.date.getDate()} time={activity.date.toLocaleTimeString() + " - " + activity.date.toLocaleDateString()} title={activity.title}/>
                        ))}
                    </div>

                    {stands.length > 0 ?
                        <>
                            <h1 className="text-4xl text-gray-800 mt-10">stands</h1>
                            <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>
                        </>
                        : <></>
                    }
                    <div className="flex flex-wrap justify-center gap-6 mt-5 mb-10">
                        {stands.map((stand, index) => (
                            <Image key={index} src={stand.logo} alt="stand logo" width={100} height={66}></Image>
                        ))}
                    </div>

                    {sponsors.length > 0 ?
                        <>
                            <h1 className="text-4xl text-gray-800 mt-10">sponsor</h1>
                            <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>
                        </>
                        : <></>
                    }
                    {sponsors.filter(s => s.type == "main").length > 0 ?
                        <>
                            <h1 className="text-2xl text-gray-800 mt-10">main</h1>
                            <div className="flex flex-wrap justify-center gap-6 mt-5 mb-10">
                                {sponsors.filter(s => s.type == "main").map((sponsor, index) => (
                                    <Image key={index} src={sponsor.logo} alt="header logo" width={100} height={66}></Image>
                                ))}
                            </div>
                        </>
                        : <></>
                    }

                    {sponsors.filter(s => s.type == "silver").length > 0 ?
                        <>
                            <h1 className="text-2xl text-gray-800 mt-10">silver</h1>
                            <div className="flex flex-wrap justify-center gap-6 mt-5 mb-10">
                                {sponsors.filter(s => s.type == "silver").map((sponsor, index) => (
                                    <Image key={index} src={sponsor.logo} alt="header logo" width={100} height={66}></Image>
                                ))}
                            </div>
                        </>
                        : <></>
                    }

                    <h1 className="text-4xl text-gray-800 mt-10">recensioni</h1>
                    <hr className="w-15 h-0.5 mx-auto bg-black border-0 rounded-sm md:my-1 dark:bg-black"/>
                    <div className="flex justify-center mt-5">
                        {userId? <AddReviewModal eventId={event.id}/> : <></>}
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} title={review.title} desc={review.description} stars={review.stars} purchased={review.purchased} name={review.user.Registry.firstName}/>
                        ))}
                    </div>
                </div>
            </nav>
        </main>
    </div>
  );
}