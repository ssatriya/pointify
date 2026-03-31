import { createInertiaApp } from "@inertiajs/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../css/app.css";
import { initializeTheme } from "@/hooks/use-appearance";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmationDialog from "@/components/confirmation-dialog";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

NiceModal.register("confirm-dialog", ConfirmationDialog);

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    strictMode: true,
    withApp(app) {
        return <TooltipProvider>{app}</TooltipProvider>

    },
    progress: {
        color: "#4B5563",
    },
});

// This will set light / dark mode on load...
initializeTheme();
