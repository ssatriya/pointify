import React, { ReactNode } from "react";
import AppLayout from "./app-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { router } from "@inertiajs/react";
import { index, reports } from "@/routes/dashboard/student-enrollments/class";
import type { BreadcrumbItem, Class } from "@/types";

type Props = {
    children: ReactNode;
    studentClass: Class;
    activeTab: "daftar-siswa" | "laporan";
    headerRight?: ReactNode;
};

export default function ClassLayout({ children, studentClass, activeTab, headerRight }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard"
        },
        {
            title: studentClass.name,
            href: index({ studentClass: studentClass.slug }).url
        }
    ];

    if (activeTab === "laporan") {
        breadcrumbs.push({
            title: "Laporan",
            href: reports({ studentClass: studentClass.slug }).url
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex items-center justify-between">
                <Tabs
                    value={activeTab}
                    onValueChange={(v) => {
                        if (v === "laporan") router.visit(reports({ studentClass: studentClass.slug }).url);
                        if (v === "daftar-siswa") router.visit(index({ studentClass: studentClass.slug }).url);
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="daftar-siswa">Daftar Siswa</TabsTrigger>
                        <TabsTrigger value="laporan">Laporan</TabsTrigger>
                    </TabsList>
                </Tabs>
                {headerRight}
            </div>
            <div>
                {children}
            </div>
        </AppLayout>
    );
}
