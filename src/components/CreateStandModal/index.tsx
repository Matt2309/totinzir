'use client';

import React from 'react';
import BaseModal from "@/components/BaseModal";
import CreateStandForm from "@/components/forms/CreateStandForm";
export function CreateStandModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <button
                className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                onClick={handleOpen}
            >
                Crea Stand
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Crea un nuovo stand" width={"3/4"}>
                <CreateStandForm />
            </BaseModal>
        </>
    );
}