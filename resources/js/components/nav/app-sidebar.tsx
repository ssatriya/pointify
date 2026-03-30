"use client";

import * as React from "react";
import {
    IconDashboard,
    IconInnerShadowTop,
    IconListDetails,
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
import { Auth, StudentClass, User } from "@/types";

const data = {
    nav: [
        {
            items: [
                {
                    title: "Dashboard",
                    href: dashboardIndex().url,
                    icon: IconDashboard,
                    permission: "dashboard.view",
                },
                {
                    title: "Persetujuan Pelanggaran",
                    href: violationApprovalsIndex({ query: { status: "pending" } }).url,
                    icon: IconListDetails,
                    permission: "violations.view",
                }
            ],
        },
        {
            label: "Akademik",
            items: [
                {
                    title: "Program Kejuruan",
                    href: vocationalProgramsIndex().url,
                    icon: IconListDetails,
                    permission: "vocational-programs.view",
                }
                , {
                    title: "Tahun Ajaran",
                    href: academicYearsIndex().url,
                    icon: IconListDetails,
                    permission: "academic-years.view",
                }, {
                    title: "Kelas",
                    href: classesIndex().url,
                    icon: IconListDetails,
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
                    icon: IconListDetails,
                    permission: "students.view",
                },
                {
                    title: "Batas Poin Pelanggaran",
                    href: pointThresholdsIndex().url,
                    icon: IconListDetails,
                    permission: "point-thresholds.view",
                },
                {
                    title: "Jenis Pelanggaran",
                    href: violationTypesIndex().url,
                    icon: IconListDetails,
                    permission: "violation-types.view",
                },
                {
                    title: "Jenis Prestasi",
                    href: rewardTypesIndex().url,
                    icon: IconListDetails,
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
                    icon: IconListDetails,
                    permission: "permissions.view",
                },
            ],
        }
    ],
};



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { studentClasses } = usePage().props as { studentClasses?: StudentClass[] };

    const { auth } = usePage().props as unknown as { auth: Auth & { user: User } };
    const { hasPermission } = usePermission();

    const filteredNav = data.nav.map(group => ({
        ...group,
        items: (group.items || []).filter(item => !item.permission || hasPermission(item.permission))
    })).filter(group => group.items.length > 0);

    const navData = [
        ...filteredNav,
        {
            label: "Daftar Kelas",
            items: studentClasses?.map((c) => ({
                title: c.abbreviation ? c.abbreviation : c.name,
                href: c.url,
                icon: IconListDetails,
                permission: "student-classes.view",
            })).filter(item => !item.permission || hasPermission(item.permission)) || [],
        }
    ].filter(group => group.items.length > 0);

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                            render={<Link href="#">
                                <IconInnerShadowTop className="size-5!" />
                                <span className="text-base font-semibold">
                                    Acme Inc.
                                </span>
                            </Link>}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navData.map((n, i) => (
                    <NavMain key={`${n.label}_${i}`} items={n.items} label={n.label} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: auth.user.name,
                    email: auth.user.email,
                    avatar: auth.user.avatar ?? "/avatars/shadcn.jpg"
                }} />
            </SidebarFooter>
        </Sidebar>
    );
}
