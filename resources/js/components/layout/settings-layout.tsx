import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { useCurrentUrl } from "@/hooks/use-current-url";
import { Heading } from "@/pages/dashboard/settings/partials/heading";

interface NavItem {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/dashboard/settings/profile',
    },
    // {
    //     title: 'Security',
    //     href: '/dashboard/settings/security',
    // },
    {
        title: 'Appearance',
        href: '/dashboard/settings/appearance',
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="px-4 py-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col lg:flex-row lg:space-x-12 mt-6">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav
                        className="flex flex-col space-y-1"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                render={<Link href={item.href} prefetch />}
                                nativeButton={false}
                                className={cn('w-full justify-start', {
                                    'bg-muted font-medium': isCurrentOrParentUrl(item.href),
                                })}
                            >
                                {item.icon && (
                                    <item.icon className="h-4 w-4" />
                                )}
                                {item.title}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
