import AppLayout from "@/components/layout/app-layout";
import SettingsLayout from "@/components/layout/settings-layout";
import { Heading } from "@/pages/dashboard/settings/partials/heading";
import AppearanceTabs from "@/pages/dashboard/settings/partials/appearance-tabs";
import { Head } from "@inertiajs/react";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Appearance settings",
        href: "/dashboard/settings/appearance",
    },
];

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                />
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = [AppLayout, SettingsLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Appearance settings",
            href: "/dashboard/settings/appearance",
        },
    ],
}];