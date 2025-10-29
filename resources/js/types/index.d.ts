import { InertiaLinkProps } from '@inertiajs/vue3';
import type { LucideIcon } from 'lucide-vue-next';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon;
    isActive?: boolean;
}

export type AppPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
};

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

// Tipado de developers
export interface Developer {
    id: number;
    name: string,
    is_active: boolean,
    image?: string,
    job?: string,
    location?: string,
    github?: string,
    linkedin?: string,
    whatsapp?: string,
    email?: string,
    facebook?: string,
    instagram?: string,
    portfolio?: string,
    cv?: File | string | null,
    created_at: string,
    updated_at: string,
}

// Tipado de servicios
export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    color: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;
