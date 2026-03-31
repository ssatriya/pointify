import { usePage } from '@inertiajs/react';
import { Auth } from '@/types';

export function usePermission() {
    const { auth } = usePage().props as unknown as { auth: Auth };

    const hasPermission = (permission: string | string[]) => {
        if (!auth.user) return false;
        
        // If it's an array, check if user has ANY of the permissions
        if (Array.isArray(permission)) {
            return permission.some(p => auth.permissions.includes(p));
        }
        
        return auth.permissions.includes(permission);
    };

    const hasRole = (role: string | string[]) => {
        if (!auth.user) return false;
        
        const userRole = auth.user.role;
        
        if (Array.isArray(role)) {
            return role.some(r => userRole === r);
        }
        
        return userRole === role;
    };

    return { hasPermission, hasRole };
}
