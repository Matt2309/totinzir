import AnalyticsCard from "@/components/AnalyticsCard";

export default function Sponsors() {
  return (
    <div>
        <main>
            <div className="flex flex-row gap-8 items-center">
                <h1 className="dashboard-title">Gestione sponsors</h1>
                <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-2 rounded-md text-white text-sm">
                    Aggiungi sponsor
                </button>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <AnalyticsCard title={"Biglietti totali"} value={"1.000"} color={"--button_blue"}/>
                <AnalyticsCard title={"Incasso totale"} value={"€ 230000"} color={"--button_orange"}/>
            </div>
        </main>
    </div>
  );
}