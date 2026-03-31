import { usePermission } from "@/hooks/use-permission"
import { StudentClass } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton } from "../ui/sidebar"
import { IconListDetails } from "@tabler/icons-react"

export function NavClasses() {
    const { studentClasses } = usePage().props as { studentClasses?: StudentClass[] }
    const { hasPermission } = usePermission()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Daftar Kelas</SidebarGroupLabel>
            <SidebarMenu>
                {studentClasses === undefined ? (
                    <>
                        <SidebarMenuItem><SidebarMenuSkeleton /></SidebarMenuItem>
                        <SidebarMenuItem><SidebarMenuSkeleton /></SidebarMenuItem>
                        <SidebarMenuItem><SidebarMenuSkeleton /></SidebarMenuItem>
                    </>
                ) : studentClasses.length === 0 ? (
                    <SidebarMenuItem>
                        <span className="px-2 text-xs text-muted-foreground">Tidak ada kelas</span>
                    </SidebarMenuItem>
                ) : (
                    studentClasses
                        .filter(() => hasPermission('student-classes.view'))
                        .map((c) => (
                            <SidebarMenuItem key={c.url}>
                                <SidebarMenuButton
                                    render={
                                        <Link href={c.url}>
                                            <IconListDetails />
                                            <span>{c.abbreviation ?? c.name}</span>
                                        </Link>
                                    }
                                />
                            </SidebarMenuItem>
                        ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}