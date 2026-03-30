import AppLayout from "@/components/layout/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import CreateViolations from "./partials/create-violations";
import CreateRewards from "./partials/create-rewards";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard"
    },
]

export default function Dashboard() {
    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <CreateViolations />
            <CreateRewards />
        </div>
    </AppLayout>;
}

