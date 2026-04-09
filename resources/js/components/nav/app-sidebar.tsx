"use client";

import * as React from "react";
import {
    IconDashboard,
    IconInnerShadowTop,
    IconClipboardCheck,
    IconSchool,
    IconCalendarEvent,
    IconLayoutGrid,
    IconUsers,
    IconBuildingCommunity,
    IconAlertCircle,
    IconMessageExclamation,
    IconTrophy,
    IconUserCog
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav/nav-main";
import { NavUser } from "@/components/nav/nav-user";
import { usePermission } from "@/hooks/use-permission";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { index as dashboardIndex } from "@/routes/dashboard"
import { index as academicYearsIndex } from "@/routes/dashboard/academic-years"
import { index as vocationalProgramsIndex } from "@/routes/dashboard/vocational-programs"
import { index as classesIndex } from "@/routes/dashboard/student-classes"
import { index as studentsIndex } from "@/routes/dashboard/students"
import { index as pointThresholdsIndex } from "@/routes/dashboard/point-thresholds"
import { index as violationTypesIndex } from "@/routes/dashboard/violation-types"
import { index as rewardTypesIndex } from "@/routes/dashboard/reward-types"
import { index as usersIndex } from "@/routes/dashboard/users"
import { index as violationApprovalsIndex } from "@/routes/dashboard/violations/approval"
import { Auth, User } from "@/types";
import { NavClasses } from "./nav-classes";

const data = {
    nav: [
        {
            items: [
                {
                    title: "Dashboard",
                    href: dashboardIndex().url,
                    icon: IconDashboard,
                    permission: "dashboard.view",
                    exact: true,
                },
                {
                    title: "Persetujuan Pelanggaran",
                    href: violationApprovalsIndex({ query: { filter: "pending" } }).url,
                    icon: IconClipboardCheck,
                    permission: "violation-approvals.view",
                }
            ],
        },
        {
            label: "Akademik",
            items: [
                {
                    title: "Program Kejuruan",
                    href: vocationalProgramsIndex().url,
                    icon: IconSchool,
                    permission: "vocational-programs.view",
                }
                , {
                    title: "Tahun Ajaran",
                    href: academicYearsIndex().url,
                    icon: IconCalendarEvent,
                    permission: "academic-years.view",
                }, {
                    title: "Kelas",
                    href: classesIndex().url,
                    icon: IconLayoutGrid,
                    permission: "student-classes.view",
                }
            ],
        },
        {
            label: "Siswa",
            items: [
                {
                    title: "Siswa",
                    href: studentsIndex().url,
                    icon: IconUsers,
                    permission: "students.view",
                },
                {
                    title: "Batas Poin Pelanggaran",
                    href: pointThresholdsIndex().url,
                    icon: IconAlertCircle,
                    permission: "point-thresholds.view",
                },
                {
                    title: "Jenis Pelanggaran",
                    href: violationTypesIndex().url,
                    icon: IconMessageExclamation,
                    permission: "violation-types.view",
                },
                {
                    title: "Jenis Prestasi",
                    href: rewardTypesIndex().url,
                    icon: IconTrophy,
                    permission: "reward-types.view",
                },
            ],
        },
        {
            label: "Manajemen",
            items: [
                {
                    title: "Pengguna",
                    href: usersIndex().url,
                    icon: IconUserCog,
                    permission: "permissions.view",
                },
            ],
        }
    ],
};



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage().props as unknown as { auth: Auth & { user: User } };
    const { hasPermission } = usePermission();

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                            render={<Link href={dashboardIndex().url}>
                                <img src="/logo.webp" alt="Pointify" className="size-6" />
                                <span className="text-base font-semibold">
                                    Pointify
                                </span>
                            </Link>}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {data.nav.map((n, i) => (
                    <NavMain key={`${n.label}_${i}`} items={n.items} label={n.label} />
                ))}
                {hasPermission('student-classes.view') && <NavClasses />}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: auth.user.name,
                    email: auth.user.email,
                    avatar: auth.user.avatar ?? "/avatar.jpg"
                }} />
            </SidebarFooter>
        </Sidebar>
    );
}
