'use client'
import React from "react";
import BaseModal from "../BaseModal";
import CreateTicketTypeForm from "@/components/forms/CreateTicketTypeForm";
import CreateSponsorForm from "@/components/forms/CreateSponsorForm";

export function CreateSponsorModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                    onClick={handleOpen}>
                Aggiungi sponsor
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Aggiungi sponsor" width={"3/5"}>
                <CreateSponsorForm/>
            </BaseModal>
        </>
    )
}