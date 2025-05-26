import {Dialog, DialogBody, DialogHeader} from "@material-tailwind/react";

export default function BaseModal({ isOpen, onClose, title, children }: {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    footer?: React.ReactNode;
}) {
    if (!isOpen) return null

    return (
        <Dialog open={isOpen} handler={onClose} className="p-4 fixed top-1/2 left-1/2 w-3/4 max-w-7xl -translate-x-1/2 -translate-y-1/2">
            <DialogHeader className="relative m-0 block">
                <span className="text-xl font-semibold">{title}</span>
                <button onClick={onClose} className="absolute top-2 right-3">
                    &times;
                </button>
            </DialogHeader>
            <DialogBody>{children}</DialogBody>
        </Dialog>
    );
}