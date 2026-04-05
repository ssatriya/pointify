import { Head } from "@inertiajs/react";
import ClassLayout from "@/components/layout/class-layout";
import type { Class } from "@/types";

// const ClassOverviewChart = lazy(() => import('../partials/class-overview-chart'))

type Props = {
    studentClass: Class;
    classOverview: {
        total_students: number;
        total_violations: number;
        total_rewards: number;
        avg_point_balance: number;
        top_violation_type: string;
        chart_data: { name: string; total: number; fill: string }[];
    };
};

export default function Reports({ studentClass, classOverview }: Props) {
    return (
        <>
            <Head title={`Laporan Kelas ${studentClass.name}`} />
            {/* <Suspense fallback={<div><Loader className="h-6 w-6 animate-spin" /> </div>}>
                <ClassOverviewChart studentClass={studentClass} classOverview={classOverview} />
            </Suspense> */}
        </>
    );
}

Reports.layout = ({ studentClass }: Props) => [
    ClassLayout,
    {
        activeTab: "laporan",
        breadcrumbs: [
            {
                title: "Dashboard",
                href: "",
            },
            {
                title: studentClass.name,
                href: "",
            },
            {
                title: "Laporan",
                href: "#",
            },
        ],
    },
];
