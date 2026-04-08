import React from "react";
import AppLayout from "@/components/layout/app-layout";
import SettingsLayout from "@/components/layout/settings-layout";
import { Heading } from "@/pages/dashboard/settings/partials/heading";
import AppearanceTabs from "@/pages/dashboard/settings/partials/appearance-tabs";
import { Head } from "@inertiajs/react";


export default function Appearance() {
    return (
        <>
            <Head title="Pengaturan tampilan" />
            <h1 className="sr-only">Pengaturan tampilan</h1>
            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Pengaturan tampilan"
                    description="Perbarui pengaturan tampilan akun Anda."
                />
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = [
    [AppLayout, {
        breadcrumbs: [
            {
                title: "Dashboard",
                href: "/dashboard",
            },
            {
                title: "Pengaturan tampilan",
                href: "/dashboard/settings/appearance",
            },
        ]
    }],
    [SettingsLayout]
];