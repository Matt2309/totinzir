'use client'
import React from "react";
import BaseModal from "../BaseModal";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";

export function CreateCategoryModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] h-[2em] px-4 ml-auto rounded-md text-white text-md cursor-pointer"
                    onClick={handleOpen}>
                Crea categoria
            </button>
            <BaseModal isOpen={open} onClose={handleOpen} title="Crea nuova categoria" width={"3/4"}>
                <CreateCategoryForm/>
            </BaseModal>
        </>
    )
}