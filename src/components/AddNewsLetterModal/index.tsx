'use client';

import React from 'react';
import BaseModal from "@/components/BaseModal";
import SubscribeNewsletterForm from "@/components/forms/SubscribeNewsLetterForm";

export function AddNewsletterModal({eventId}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <button
                className="bg-[light-dark(var(--button_orange),var(--button_orange))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                onClick={handleOpen}
            >
                Iscriviti alla Newsletter
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Iscriviti alla Newsletter" width={"3/4"}>
                <SubscribeNewsletterForm eventId={eventId}/>
            </BaseModal>
        </>
    );
}