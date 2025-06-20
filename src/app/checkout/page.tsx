'use client'

import ResumeLine from "@/components/ResumeLine";
import HeaderMain from "@/components/Headers/HeaderMain";
import React, {useActionState, useEffect, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getEvent} from "@/db/actions/getEventById";
import {purchaseTickets} from "@/db/actions/purchaseTickets";
import {getUserPaymentMethods} from "@/db/actions/getUserPaymentMethods";
import {useUser} from "@/context/UserContext";
import { checkDiscountCode as apiCheckDiscountCode } from "@/db/actions/checkDiscountCode";

const fetchEvent = async (id): Promise<any> => {
    try {
        return await getEvent(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return null;
    }
};

const fetchPaymentMethod = async (id): Promise<any> => {
    try {
        return await getUserPaymentMethods(id);
    } catch (error) {
        console.error(`Errore nel recupero eventi`, error);
        return null;
    }
};

const checkDiscountCode = async (code): Promise<any> => {
    try {
        return await apiCheckDiscountCode(code);
    } catch (error) {
        console.error(`Errore nel recupero codice sconto`, error);
        return null;
    }
};


export default function checkout() {
    const searchParams = useSearchParams();
    const [selectedTickets, setSelectedTickets] = useState(null);
    const [total, setTotal] = useState(0);
    const [state, action, pending] = useActionState(purchaseTickets, undefined)
    //disattiva bottone salva quando seleziono carte salvate
    const [useSaved, setUseSaved] = useState(false)
    const { userId } = useUser();

    const [discountCode, setDiscountCode] = useState('');
    const [isValidDiscount, setIsValidDiscount] = useState('pending');
    const handleInputChange = (event) => {
        setDiscountCode(event.target.value);
    };

    const handleDiscountCode = async () => {
        try {
            const result = await checkDiscountCode(discountCode);
            if (result) {
                setIsValidDiscount("true");
                setTotal(total-(total*result))
            } else {
                setIsValidDiscount("false");
            }
            console.log("Discount Code Validation Result: ", result);
        } catch (error) {
            console.error(`Errore nella verifica del codice sconto`, error);
        }
    };

    /*handler per l'input data nascita*/
    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const handleDateChange = (e, nextFieldRef) => {
        const { value, maxLength } = e.target;
        const numericValue = value.replace(/\D/g, '');
        e.target.value = numericValue;

        if (numericValue.length >= maxLength && nextFieldRef && nextFieldRef.current) {
            nextFieldRef.current.focus();
        }
    };

    /*handler per l'input carta*/
    const [savedPaymentCards, setSavedPaymentCards] = useState([]);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (e) => {
        setUseSaved(false);
        const { value } = e.target;
        let formattedValue = value.replace(/\D/g, '');
        formattedValue = formattedValue.substring(0, 16);
        formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formattedValue);
    };

    const formatExpiryDate = (e) => {
        setUseSaved(false);
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = value;

        if (value.length > 2) {
            formattedValue = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        //(MM/AA)
        e.target.value = formattedValue.substring(0, 5);
    };

    const handleExpiryDate = (e) => {
        setExpiryDate(e.target.value.substring(0, 5));
    };

    const handleCvvChange = (e) => {
        setUseSaved(false);
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.substring(0, 3);
        setCvv(e.target.value);
    };

    const handleSavedCardChange = (e) => {
        setUseSaved(true);
        const selectedId = e.target.value;
        const cardToFill = savedPaymentCards.find(card => card.id === parseInt(selectedId));
        let formattedExpiry = '';
        if (cardToFill.expiryDate instanceof Date) {
            const month = (cardToFill.expiryDate.getMonth() + 1).toString().padStart(2, '0');
            const year = cardToFill.expiryDate.getFullYear().toString().substring(2, 4);
            formattedExpiry = `${month}/${year}`;
        } else {
            // Assume it's already in MM/YY or a string that can be directly used
            formattedExpiry = cardToFill.expiryDate;
        }

        if (cardToFill) {
            setCardNumber(cardToFill.cardNumber);
            setExpiryDate(formattedExpiry);
            setCvv(cardToFill.cvv);
        } else {
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
        }
    };

    useEffect(() => {
        fetchPaymentMethod(parseInt(userId.toString())).then(res => {
            setSavedPaymentCards(res || [])});
    }, []);

    useEffect(() => {
        const data = searchParams.get('data');
        if (data) {
            try {
                const decodedData = JSON.parse(decodeURIComponent(data));
                let total = 0;
                const fetchEventsAndSet = async () => {
                    await Promise.all(
                        Object.entries(decodedData).map(async ([id, ticket]) => {
                            ticket.event = await fetchEvent(ticket.eventId);
                            total += ticket.price*ticket.quantity;
                        })
                    );
                    setTotal(total);
                    setSelectedTickets(decodedData);
                };
                fetchEventsAndSet();
            } catch (error) {
                console.error("Errore nel parsing dei dati JSON:", error);
            }
        }
    }, [searchParams]);

    if (!selectedTickets) return <p>Caricamento biglietti...</p>

    return (
    <div>
        <main className="flex flex-col items-center">
            <HeaderMain/>
            <div className="block w-4/6">
                <h1 className="text-4xl mt-20">CHECKOUT</h1>
                <hr className="w-15 h-0.5 bg-black border-0 rounded-sm mb-5 dark:bg-black"/>
            </div>
            <div className="grid grid-cols-[60%_40%] bg-white w-4/6 rounded-3xl mb-10">
                <div className="p-10">
                    <form action={action}>
                        <input type="hidden" name="totalAmount" value={(total + 2).toFixed(2)} />
                        <input type="hidden" name="commission" value={2} />

                        {selectedTickets && Object.entries(selectedTickets).map(([id, ticket], index) => (
                            <div key={id}>
                                <input type="hidden" name={`tickets[${index}][id]`} value={id} />
                                <input type="hidden" name={`tickets[${index}][title]`} value={ticket.title} />
                                <input type="hidden" name={`tickets[${index}][quantity]`} value={ticket.quantity} />
                                <input type="hidden" name={`tickets[${index}][price]`} value={ticket.price} />
                                <input type="hidden" name={`tickets[${index}][eventId]`} value={ticket.eventId} />
                            </div>
                        ))}
                        {/* Nome e Cognome */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-1 text-sm">Nome</label>
                                <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="firstname" placeholder="Mario" />
                                {state?.errors?.firstname && <p className="text-red-600 text-xs -mt-1">{state.errors.firstname}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">Cognome</label>
                                <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="lastname" placeholder="Rossi" />
                                {state?.errors?.lastname && <p className="text-red-600 text-xs -mt-1">{state.errors.lastname}</p>}
                            </div>
                        </div>

                        {/* Data di nascita */}
                        <div>
                            <label className="block mb-1 text-sm">Data di nascita</label>
                            <div className="flex gap-2">
                                <input
                                    className="w-1/4 border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-center text-sm"
                                    placeholder="GG"
                                    name="day"
                                    maxLength="2"
                                    ref={dayRef}
                                    onChange={(e) => handleDateChange(e, monthRef)}
                                />
                                <span className="text-xl self-center">/</span>
                                <input
                                    className="w-1/4 border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-center text-sm"
                                    placeholder="MM"
                                    name="month"
                                    maxLength="2"
                                    ref={monthRef}
                                    onChange={(e) => handleDateChange(e, yearRef)}
                                />
                                <span className="text-xl self-center">/</span>
                                <input
                                    className="mb-2 w-1/4 border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-center text-sm"
                                    placeholder="AAAA"
                                    name="year"
                                    maxLength="4"
                                    ref={yearRef}
                                    onChange={(e) => handleDateChange(e, null)}
                                />
                            </div>
                            {state?.errors?.birthDate && <p className="text-red-600 text-xs -mt-1">{state.errors.birthDate}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm">Email</label>
                            <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="email" name="email" placeholder="mario.rossi@email.com" />
                            {state?.errors?.email && <p className="text-red-600 text-xs -mt-1">{state.errors.email}</p>}
                        </div>

                        {/* Città, CAP, Provincia e Paese */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-1 text-sm">Città di nascita</label>
                                <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="birthplace" placeholder="Bologna" />
                                {state?.errors?.birthplace && <p className="text-red-600 text-xs -mt-1">{state.errors.birthplace}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">CAP</label>
                                <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="zip" placeholder="40100" />
                                {state?.errors?.zip && <p className="text-red-600 text-xs -mt-1">{state.errors.zip}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">Provincia</label>
                                <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="province" placeholder="BO" />
                                {state?.errors?.province && <p className="text-red-600 text-xs -mt-1">{state.errors.province}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">Paese</label>
                                <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="country" placeholder="Italia" />
                                {state?.errors?.country && <p className="text-red-600 text-xs -mt-1">{state.errors.country}</p>}
                            </div>
                        </div>

                        {/* Indirizzo */}
                        <div>
                            <label className="block mb-1 text-sm">Indirizzo</label>
                            <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="address" placeholder="Via Roma 12" />
                            {state?.errors?.address && <p className="text-red-600 text-xs -mt-1">{state.errors.address}</p>}
                        </div>

                        {/* Telefono */}
                        <div>
                            <label className="block mb-1 text-sm">Telefono</label>
                            <input className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="tel" name="phone" placeholder="3331234567" />
                            {state?.errors?.phone && <p className="text-red-600 text-xs -mt-1">{state.errors.phone}</p>}
                        </div>

                        ---

                        {/* Metodo di Pagamento */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Dettagli Pagamento</h3>
                            <div className="mb-4">
                                <label htmlFor="savedCards" className="block mb-1 text-sm">Seleziona Carta Salvata</label>
                                <select
                                    id="savedCards"
                                    name="savedCardId" // Added name for form submission if you want to send the ID
                                    className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm"
                                    onChange={handleSavedCardChange}
                                >
                                    <option value="">-- Seleziona una carta salvata --</option>
                                    {savedPaymentCards.map((card) => (
                                        <option key={card.id} value={card.id}>{card.cardNumber}</option>
                                    ))}
                                </select>
                            </div>
                            <label className="block mb-1 text-sm">Numero Carta</label>
                            <input
                                className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm"
                                type="text"
                                name="cardNumber"
                                placeholder="XXXX XXXX XXXX XXXX"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                            />
                            {state?.errors?.cardNumber && <p className="text-red-600 text-xs -mt-1">{state.errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div>
                                <label className="block mb-1 text-sm">Scadenza</label>
                                <input
                                    className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm"
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/AA"
                                    maxLength="5"
                                    onKeyUp={formatExpiryDate}
                                    onChange={handleExpiryDate}
                                    inputMode="numeric"
                                    value={expiryDate}
                                />
                                {state?.errors?.expiryDate && <p className="text-red-600 text-xs -mt-1">{state.errors.expiryDate}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">CVV</label>
                                <input
                                    className="mb-2 w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm"
                                    type="text"
                                    name="cvv"
                                    placeholder="XXX"
                                    maxLength="3"
                                    onChange={handleCvvChange}
                                    inputMode="numeric"
                                    value={cvv}
                                />
                                {state?.errors?.cvv && <p className="text-red-600 text-xs -mt-1">{state.errors.cvv}</p>}
                            </div>
                        </div>
                        {!useSaved ?
                            <div className="flex items-end pb-1">
                                <input className="mr-2 h-4 w-4 text-[light-dark(var(--button_blue),var(--button_blue))] border-[light-dark(var(--button_blue),var(--button_blue))] rounded" type="checkbox" name="savePayment" id="savePayment" value="true"/>
                                <label htmlFor="savePayment" className="text-sm">Salva metodo di pagamento</label>
                            </div>
                            : <></>
                        }


                        {/* Submit */}
                        <div className="pt-4 mb-2">
                            <button type="submit" className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold py-2 px-6 rounded-md text-white text-sm">
                                Esegui l'ordine
                            </button>
                        </div>
                        {state?.errors?.genericerror && <p className="text-red-600 text-xs -mt-1">{state.errors.genericerror}</p>}
                    </form>
                    <br/>
                </div>
                <div className="overflow-hidden relative rounded-r-3xl bg-[#D9D9D9] p-10">
                    <h1 className="text-3xl text-gray-700">riepilogo</h1>
                    {Object.entries(selectedTickets).map(([id, ticket]) => (
                        <ResumeLine key={id} quantity={ticket.quantity} ticketType={ticket.title} eventName={ticket.event?.title || ""} price={ticket.price.toFixed(2)} city={ticket.event.location} date={ticket.event.startDate.toLocaleDateString()}/>
                    ))}
                    <div className="flex flex-row justify-between w-3/4 mt-2">
                        <h1 className="text-xl text-gray-700">costi di servizio</h1>
                        <label className="text-lg">€2</label>
                    </div>
                    <hr className="w-60 h-[1px] bg-black border-0 rounded-sm mb-3 dark:bg-black"/>
                    <div className="flex flex-row justify-between w-3/4">
                        <h1 className="text-xl text-gray-700">totale</h1>
                        <label className="text-lg">€{(total + 2).toFixed(2)}</label>
                    </div>
                    <div className="mt-5">
                        <label className="block mb-1 text-sm">Codice sconto</label>
                        <div className="flex flex-row gap-2 items-center">
                            <input className="w-full border-2 bg-white border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm"
                                   type="text"
                                   name="discountCode"
                                   placeholder="CODICE02"
                                   onChange={handleInputChange}
                            />
                            <button onClick={handleDiscountCode} className="bg-[light-dark(var(--button_blue),var(--button_blue))] font-bold px-3 py-2 rounded-md text-white text-sm">
                                VALIDA
                            </button>
                        </div>
                    </div>
                    <p className="text-[light-dark(var(--button_blue),var(--button_blue))]">{isValidDiscount === "pending" ? "" : ( isValidDiscount == "true" ? "Sconto applicato!" : "Codice non valido")}</p>
                </div>
            </div>
        </main>
    </div>
  );
}