import { createInertiaApp } from "@inertiajs/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../css/app.css";
import { initializeTheme } from "@/hooks/use-appearance";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Toaster } from "@/components/ui/sonner";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

NiceModal.register("confirm-dialog", ConfirmationDialog);

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider>
                {app}
                <Toaster closeButton />
            </TooltipProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

initializeTheme();
