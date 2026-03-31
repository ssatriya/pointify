import AppLayout from "@/components/layout/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import CreateViolations from "./partials/create-violations";
import CreateRewards from "./partials/create-rewards";
import { index as dashboardIndex } from "@/routes/dashboard";


export default function Dashboard() {
    return <>
        <Head title="Dashboard" />
        <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* <CreateViolations />
            <CreateRewards /> */}
        </div>
    </>
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardIndex(),
        },
    ],
};
