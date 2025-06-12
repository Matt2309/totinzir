'use client';

import React from 'react';
import BaseModal from "@/components/BaseModal";
import CreateDiscountCodeForm from "@/components/forms/CreateDiscountCodeForm";
export function CreateDiscountCodeModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <button
                className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                onClick={handleOpen}
            >
                Crea codice sconto
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Crea un nuovo stand" width={"3/4"}>
                <CreateDiscountCodeForm />
            </BaseModal>
        </>
    );
}