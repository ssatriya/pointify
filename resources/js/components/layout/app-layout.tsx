import React, { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../nav/app-sidebar";
import { BreadcrumbItem } from "@/types";
import { SiteHeader } from "../nav/site-header";
import { usePage } from "@inertiajs/react";
import { ModalRoot } from "@inertiaui/modal-react";

type Props = {
    children: ReactNode,
    breadcrumbs: BreadcrumbItem[]
}

export default function AppLayout({ children, breadcrumbs }: Props) {
    const { sidebarOpen } = usePage().props as { sidebarOpen: boolean };
    return (
        <SidebarProvider
            defaultOpen={sidebarOpen}
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader breadcrumbs={breadcrumbs} />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
                            {children}
                            <ModalRoot />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
