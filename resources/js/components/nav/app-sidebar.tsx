"use client";

import * as React from "react";
import {
    IconDashboard,
    IconInnerShadowTop,
    IconListDetails,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav/nav-main";
import { NavUser } from "@/components/nav/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { index as dashboardIndex } from "@/routes/dashboard"
import { index as academicYearsIndex } from "@/routes/dashboard/academic-years"
import { index as vocationalProgramsIndex } from "@/routes/dashboard/vocational-programs"
import { index as classesIndex } from "@/routes/dashboard/student-classes"
import { index as studentsIndex } from "@/routes/dashboard/students"
import { index as pointThresholdsIndex } from "@/routes/dashboard/point-thresholds"
import { index as violationTypesIndex } from "@/routes/dashboard/violation-types"
import { index as rewardTypesIndex } from "@/routes/dashboard/reward-types"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    nav: [
        {
            items: [
                {
                    title: "Dashboard",
                    href: dashboardIndex(),
                    icon: IconDashboard,
                }
            ],
        },
        {
            label: "Akademik",
            items: [
                {
                    title: "Program Kejuruan",
                    href: vocationalProgramsIndex(),
                    icon: IconListDetails,
                }
                , {
                    title: "Tahun Ajaran",
                    href: academicYearsIndex(),
                    icon: IconListDetails,
                }, {
                    title: "Kelas",
                    href: classesIndex(),
                    icon: IconListDetails,
                }
            ],
        },
        {
            label: "Siswa",
            items: [
                {
                    title: "Siswa",
                    href: studentsIndex(),
                    icon: IconListDetails,
                },
                {
                    title: "Batas Poin Pelanggaran",
                    href: pointThresholdsIndex(),
                    icon: IconListDetails,
                },
                {
                    title: "Jenis Pelanggaran",
                    href: violationTypesIndex(),
                    icon: IconListDetails,
                },
                {
                    title: "Jenis Prestasi",
                    href: rewardTypesIndex(),
                    icon: IconListDetails,
                },
            ],
        }
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                {data.nav.map((n, i) => (
                    <NavMain key={`${n.label}_${i}`} items={n.items} label={n.label} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
