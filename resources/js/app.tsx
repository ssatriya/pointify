import { createInertiaApp } from "@inertiajs/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../css/app.css";
import { initializeTheme } from "@/hooks/use-appearance";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { ModalStackProvider } from '@inertiaui/modal-react'
import { Toaster } from "@/components/ui/sonner"
import AuthLayout from "./components/layout/auth-layout";
import AppLayout from "./components/layout/app-layout";
import SettingsLayout from "./components/layout/settings-layout";
import ModalLayout from "./components/layout/modal-layout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

NiceModal.register("confirm-dialog", ConfirmationDialog)

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    withApp(app) {
        return <ModalStackProvider>
            <NiceModal.Provider>
                <TooltipProvider>
                    {app}
                    <Toaster richColors position="top-right" />
                </TooltipProvider>
            </NiceModal.Provider>
        </ModalStackProvider>
    },
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return [AppLayout, ModalLayout]
        }
    },
    strictMode: true,
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
