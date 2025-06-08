'use client'
import React from "react";
import BaseModal from "../BaseModal";
import CreateActivityForm from "@/components/forms/CreateActivityForm";

export function CreateActivityModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                    onClick={handleOpen}>
                Aggiungi attività
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Crea nuova attività" width={"3/4"}>
                <CreateActivityForm/>
            </BaseModal>
        </>
    )
}