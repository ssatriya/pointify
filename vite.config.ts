import inertia from "@inertiajs/vite";
import { wayfinder } from "@laravel/vite-plugin-wayfinder";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    optimizeDeps: {
        include: ["lucide-react", "@tabler/icons-react"],
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
        }),
        inertia({ ssr: false }),
        react({
            babel: {
                plugins: ["babel-plugin-react-compiler"],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        visualizer({ open: true }),
    ],
    build: {
        chunkSizeWarningLimit: 300,
        rolldownOptions: {
            output: {
                codeSplitting: {
                    minSize: 20000,
                    groups: [
                        {
                            name: "react-vendor",
                            test: /node_modules\/(react|react-dom)/,
                        },
                        {
                            name: "ui-vendor",
                            test: /node_modules\/(@floating-ui|@base-ui|@radix-ui)/,
                        },
                        {
                            name: "vendor",
                            test: /node_modules/,
                        },
                    ],
                },
            },
        },
    },
});
