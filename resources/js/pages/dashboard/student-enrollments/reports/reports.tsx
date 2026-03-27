import React from "react";
import { Head } from "@inertiajs/react";
import ClassLayout from "@/components/layout/class-layout";
import type { Class } from "@/types";
import ClassOverviewChart from "../partials/class-overview-chart";

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
        <ClassLayout studentClass={studentClass} activeTab="laporan">
            <Head title={`Laporan Kelas ${studentClass.name}`} />
            <ClassOverviewChart studentClass={studentClass} classOverview={classOverview} />
        </ClassLayout>
    );
}
