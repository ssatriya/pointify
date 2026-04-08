import {
    IconCreditCard,
    IconDotsVertical,
    IconLogout,
    IconNotification,
    IconUserCircle,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Link, router } from "@inertiajs/react";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { Settings } from "lucide-react";
import { edit } from '@/routes/profile';
import { logout } from '@/routes';

export function NavUser({
    user,
}: {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}) {
    const cleanup = useMobileNavigation();
    const { isMobile } = useSidebar();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                suppressHydrationWarning
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </span>
                                </div>
                                <IconDotsVertical className="ml-auto size-4" />
                            </SidebarMenuButton>
                        } />
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                nativeButton={false}
                                render={
                                    <Link
                                        className="block w-full cursor-pointer"
                                        href={edit()}
                                        prefetch
                                        onClick={cleanup}
                                    >
                                        <Settings />
                                        Settings
                                    </Link>
                                }
                            />
                            <DropdownMenuItem>
                                <IconCreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconNotification />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            nativeButton={true}
                            render={<Link
                                className="block w-full cursor-pointer"
                                href={logout()}
                                method="post"
                                as="button"
                                onClick={handleLogout}
                            >
                                <IconLogout />
                                Log out</Link>}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
