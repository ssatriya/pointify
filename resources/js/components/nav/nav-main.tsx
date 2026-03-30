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

type Props = {
    items: NavItem[]
    label?: string
}

export function NavMain({
    items,
    label
}: Props) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                className="tabular-nums data-[active=true]:bg-muted text-muted-foreground"
                                tooltip={{ children: item.title }}
                                isActive={isCurrentOrParentUrl(item.href)}
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
