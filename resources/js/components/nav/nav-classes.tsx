import { usePermission } from "@/hooks/use-permission"
import { StudentClass } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton } from "../ui/sidebar"
import { IconListDetails } from "@tabler/icons-react"
import { useCurrentUrl } from "@/hooks/use-current-url"

export function NavClasses() {
    const { studentClasses } = usePage().props as { studentClasses?: StudentClass[] }
    const { hasPermission } = usePermission()
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="tracking-wider">Daftar Kelas</SidebarGroupLabel>
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
                        .map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton
                                    className="tabular-nums"
                                    tooltip={{ children: item.abbreviation ?? item.name }}
                                    isActive={isCurrentUrl(item.url, undefined, false)}
                                    render={<Link
                                        href={item.url}
                                        prefetch
                                    >
                                        <span>{item.abbreviation ?? item.name}</span>
                                    </Link>}
                                />
                            </SidebarMenuItem>
                        ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}