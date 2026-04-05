import AppLayout from "@/components/layout/app-layout";
import { Head } from "@inertiajs/react";
import CreateViolations from "./partials/create-violations";
import CreateRewards from "./partials/create-rewards";
import { index as dashboardIndex } from "@/routes/dashboard";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
type Framework = {
    label: string;
    value: string;
};

const frameworks: Framework[] = [
    { label: "Next.js", value: "next" },
    { label: "SvelteKit", value: "sveltekit" },
    { label: "Nuxt", value: "nuxt" },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <CreateViolations />
                <CreateRewards />
            </div>
        </>
    );
}

Dashboard.layout = [
    AppLayout,
    {
        breadcrumbs: [
            {
                title: "Dashboard",
                href: dashboardIndex(),
            },
        ],
    },
];
