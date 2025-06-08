'use client'
import React from "react";
import BaseModal from "../BaseModal";
import AddReviewForm from "@/components/forms/AddReviewForm";

export function AddReviewModal({eventId}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                    onClick={handleOpen}>
                Aggiungi una recensione
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Aggiungi una recensione" width={"3/4"}>
                <AddReviewForm eventId={eventId}/>
            </BaseModal>
        </>
    )
}