'use client'
import CreateEventForm from "@/components/forms/CreateEventForm";
import React from "react";
import BaseModal from "../BaseModal";

export function CreateEventModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                    onClick={handleOpen}>
                Crea evento
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Crea nuovo evento">
                <CreateEventForm/>
            </BaseModal>
        </>
    )
}