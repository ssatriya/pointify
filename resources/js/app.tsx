import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../css/app.css";
import { initializeTheme } from "@/hooks/use-appearance";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { renderApp } from '@inertiaui/modal-react'
import { Toaster } from "@/components/ui/sonner"

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        NiceModal.register("confirm-dialog", ConfirmationDialog);
        root.render(
            <StrictMode>
                <NiceModal.Provider>
                    <TooltipProvider>
                        {renderApp(App as any, props as any)}
                        <Toaster richColors position="top-right" />
                    </TooltipProvider>
                </NiceModal.Provider>
            </StrictMode>,
        );
    },
    progress: {
        color: "#4B5563",
        showSpinner: true
    },
});

// This will set light / dark mode on load...
initializeTheme();
