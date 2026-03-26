import {createInertiaApp} from "@inertiajs/react";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {TooltipProvider} from "@/components/ui/tooltip";
import "../css/app.css";
import {initializeTheme} from "@/hooks/use-appearance";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmationDialog from "@/components/confirmation-dialog";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx"),
        ),
    setup({el, App, props}) {
        const root = createRoot(el);
        NiceModal.register("confirm-modal", ConfirmationDialog);
        root.render(
            <StrictMode>
                <NiceModal.Provider>
                    <TooltipProvider>
                        <App {...props} />
                    </TooltipProvider>
                </NiceModal.Provider>
            </StrictMode>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});

// This will set light / dark mode on load...
initializeTheme();
