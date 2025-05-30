'use client'
import React from "react";
import BaseModal from "../BaseModal";
import CreateOrganizerForm from "@/components/forms/CreateOrganzierForm";

export function CreateOrganizerModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                    onClick={handleOpen}>
                Aggiungi
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Crea nuovo evento" width={"3/4"}>
                <CreateOrganizerForm/>
            </BaseModal>
        </>
    )
}