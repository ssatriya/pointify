import { createInertiaApp } from "@inertiajs/react";
import { ReactElement } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../css/app.css";
import { initializeTheme } from "@/hooks/use-appearance";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { ModalRoot, ModalStackProvider } from '@inertiaui/modal-react'
import { Toaster } from "@/components/ui/sonner"

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

NiceModal.register("confirm-dialog", ConfirmationDialog);

function ModalLayout({ children }: { children: ReactElement }) {
    return (
        <>
            {children}
            <ModalRoot />
        </>
    );
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: () => ModalLayout,
    strictMode: true,
    withApp: (app) => (
        <ModalStackProvider>
            <NiceModal.Provider>
                <TooltipProvider>
                    {app}
                    <Toaster richColors position="top-right" />
                </TooltipProvider>
            </NiceModal.Provider>
        </ModalStackProvider>
    ),
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
