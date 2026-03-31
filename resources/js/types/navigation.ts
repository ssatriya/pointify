import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | ComponentType | null;
    isActive?: boolean;
    permission?: string;
    exact?: boolean;
};

export type NavGroup = {
    label?: string;
    items: NavItem[];
};