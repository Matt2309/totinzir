import ResumeLine from "@/components/ResumeLine";
import HeaderMain from "@/components/Headers/HeaderMain";

export default function checkout() {
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
                    <form className="space-y-6">
                        {/* Nome e Cognome */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-1 text-sm">Nome</label>
                                <input className="w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="firstname" placeholder="Mario" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">Cognome</label>
                                <input className="w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="lastname" placeholder="Rossi" />
                            </div>
                        </div>

                        {/* Data di nascita */}
                        <div>
                            <label className="block mb-1 text-sm">Data di nascita</label>
                            <div className="flex gap-2">
                                <input className="w-1/4 border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-center text-sm" placeholder="GG" name="day" />
                                <span className="text-xl self-center">/</span>
                                <input className="w-1/4 border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-center text-sm" placeholder="MM" name="month" />
                                <span className="text-xl self-center">/</span>
                                <input className="w-1/4 border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-center text-sm" placeholder="AAAA" name="year" />
                            </div>
                        </div>

                        {/* Genere */}
                        <div>
                            <label className="block mb-1 text-sm">Genere</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" value="male" />
                                    <span>Maschio</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" value="female" />
                                    <span>Femmina</span>
                                </label>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm">Email</label>
                            <input className="w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="email" name="email" placeholder="mario.rossi@email.com" />
                        </div>

                        {/* Città e CAP */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-1 text-sm">Città di nascita</label>
                                <input className="w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="birthplace" placeholder="Bologna" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm">CAP</label>
                                <input className="w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="zip" placeholder="40100" />
                            </div>
                        </div>

                        {/* Indirizzo */}
                        <div>
                            <label className="block mb-1 text-sm">Indirizzo</label>
                            <input className="w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="text" name="address" placeholder="Via Roma 12" />
                        </div>

                        {/* Telefono */}
                        <div>
                            <label className="block mb-1 text-sm">Telefono</label>
                            <input className="w-full border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" type="tel" name="phone" placeholder="3331234567" />
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button type="submit" className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold py-2 px-6 rounded-md text-white text-sm">
                                Esegui l'ordine
                            </button>
                        </div>
                    </form>

                    <br/>
                </div>
                <div className="overflow-hidden relative rounded-r-3xl bg-[#D9D9D9] p-10">
                    <h1 className="text-3xl text-gray-700">riepilogo</h1>

                    <ResumeLine quantity={2} ticketType={"INTERO"} eventName={"FESTA PAZZESCA"} price={20} city={"RIMINI (RN)"} date={"20 AGOSTO 2025"}/>

                    <div className="flex flex-row justify-between w-3/4 mt-2">
                        <h1 className="text-xl text-gray-700">costi di servizio</h1>
                        <label className="text-lg">€2</label>
                    </div>
                    <hr className="w-60 h-[1px] bg-black border-0 rounded-sm mb-3 dark:bg-black"/>
                    <div className="flex flex-row justify-between w-3/4">
                        <h1 className="text-xl text-gray-700">totale</h1>
                        <label className="text-lg">€32</label>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}