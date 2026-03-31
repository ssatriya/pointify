import { ModalRoot } from "@inertiaui/modal-react";
import { ReactElement } from "react";

export default function ModalLayout({ children }: { children: ReactElement }) {
    return (
        <>
            {children}
            <ModalRoot />
        </>
    );
}
