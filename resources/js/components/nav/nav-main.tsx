import {
    SidebarGroup,
    SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavItem } from "@/types";
import { Link } from "@inertiajs/react";
import { useCurrentUrl } from "@/hooks/use-current-url";
import { usePermission } from "@/hooks/use-permission";

type Props = {
    items: NavItem[]
    label?: string
}

export function NavMain({
    items,
    label
}: Props) {
    const { isCurrentUrl } = useCurrentUrl();
    const { hasPermission } = usePermission();

    const visibleItems = items.filter(item => !item.permission || hasPermission(item.permission));

    if (visibleItems.length === 0) return null;

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
                <SidebarMenu>
                    {visibleItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                className="tabular-nums text-muted-foreground text"
                                tooltip={{ children: item.title }}
                                isActive={isCurrentUrl(item.href, undefined, !item.exact)}
                                render={<Link
                                    href={item.href}
                                    prefetch
                                >
                                    {item.icon && <item.icon className="size-4 shrink-0" />}
                                    <span>{item.title}</span>
                                </Link>}
                            />
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
