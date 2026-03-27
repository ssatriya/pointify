import AppLayout from "@/components/layout/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard"
    },
]

export default function Dashboard() {
    return <AppLayout breadcrumbs={breadcrumbs}>Dashboard</AppLayout>;
}
