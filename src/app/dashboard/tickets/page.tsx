import AnalyticsCard from "@/components/AnalyticsCard";
import React from "react";
import {CreateTicketTypeModal} from "@/components/CreateTicketTypeModal";

export default function Tickets() {
  return (
    <div>
        <main>
            <div className="flex flex-row gap-8 items-center">
                <h1 className="dashboard-title">Gestione biglietti</h1>
                <CreateTicketTypeModal/>
            </div>
            <div className="flex flex-row gap-10 mt-5">
                <AnalyticsCard title={"Biglietti totali"} value={"1.000"} color={"--button_blue"}/>
                <AnalyticsCard title={"Incasso totale"} value={"€ 230000"} color={"--button_orange"}/>
            </div>

        </main>
    </div>
  );
}