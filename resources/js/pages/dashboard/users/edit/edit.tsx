import {
    CardTable,
    CardTableContent,
    CardTableHeader,
    CardTableTitle
} from "@/components/ui/card-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/app-layout";
import type { BreadcrumbItem, User, OptionType } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { update as updateRoute } from "@/routes/dashboard/users";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
    user: User;
    allPermissions: string[];
    allRoles: OptionType[];
};

export default function UserEdit({ user, allPermissions, allRoles }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Pengguna", href: "/dashboard/users" },
        { title: user.name, href: "#" },
    ];

    const { auth } = usePage().props;
    const isSuperAdmin = auth.user?.roles?.some((role: any) =>
        typeof role === 'string' ? role === 'super-admin' : role.name === 'super-admin'
    );

    const { data, setData } = useForm({
        permissions: user.direct_permissions ?? [],
        roles: user.roles ?? [],
    });

    // Ensure form state stays in sync when user props update from server
    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            permissions: user.direct_permissions ?? [],
            roles: user.roles ?? [],
        }));
    }, [user.direct_permissions, user.roles]);

    const togglePermission = (permission: string) => {
        if (user.role_permissions?.includes(permission)) return;

        const newPermissions = data.permissions.includes(permission)
            ? data.permissions.filter((p) => p !== permission)
            : [...data.permissions, permission];

        setData('permissions', newPermissions);

        // Immediate server sync
        router.put(updateRoute({ user: user.id }).url, {
            permissions: newPermissions,
            roles: data.roles
        }, {
            preserveScroll: true,
        });
    };

    const updateRole = (role: string | null) => {
        if (!role) return;
        const newRoles = [role];
        setData('roles', newRoles);

        router.put(updateRoute({ user: user.id }).url, {
            roles: newRoles,
            // Skip sending permissions so we don't accidentally save role permissions as direct permissions
        }, {
            preserveScroll: true,
        });
    };

    // Group permissions by prefix
    const groupedPermissions = allPermissions.reduce((acc, permission) => {
        const [group] = permission.split('.');
        if (!acc[group]) acc[group] = [];
        acc[group].push(permission);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pengguna - ${user.name}`} />

            <div className="flex flex-col gap-8">
                <CardTable>
                    <CardTableHeader>
                        <CardTableTitle
                            title="Profil Pengguna"
                            description="Informasi dasar akun pengguna."
                        />
                    </CardTableHeader>
                    <CardTableContent className="p-8">
                        <div className="grid gap-y-4 gap-x-8 sm:grid-cols-2">
                            <div className="grid">
                                <span className="font-medium text-muted-foreground uppercase tracking-wider text-sm">Nama Lengkap</span>
                                <span className="text-lg">{user.name}</span>
                            </div>
                            <div className="grid">
                                <span className="font-medium text-muted-foreground uppercase tracking-wider text-sm">Tanggal Daftar</span>
                                <span className="text-lg">{user.created_at}</span>
                            </div>
                            <div className="grid">
                                <span className="font-medium text-muted-foreground uppercase tracking-wider text-sm">Alamat Email</span>
                                <span className="text-lg">{user.email}</span>
                            </div>
                        </div>
                    </CardTableContent>
                </CardTable>

                {isSuperAdmin && (
                    <CardTable>
                        <CardTableHeader>
                            <CardTableTitle
                                title="Manajemen Role"
                                description="Tentukan peran utama pengguna untuk mengatur hak akses dasar."
                            />
                        </CardTableHeader>
                        <CardTableContent className="p-8">
                            <div className="max-w-xs space-y-2">
                                <Label htmlFor="role-select">Pilih Role / Peran</Label>
                                <Select
                                    value={data.roles[0] || ""}
                                    onValueChange={updateRole}
                                >
                                    <SelectTrigger id="role-select" className="w-full h-10">
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {allRoles.map((role) => (
                                                <SelectItem key={role.value as string} value={role.value as string}>
                                                    {role.label as string}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground italic">
                                    * Perubahan role akan segera disimpan dan mungkin mempengaruhi hak akses pengguna.
                                </p>
                            </div>
                        </CardTableContent>
                    </CardTable>
                )}

                {!isSuperAdmin && (
                    <CardTable>
                        <CardTableHeader>
                            <CardTableTitle
                                title="Role / Peran"
                                description="Peran pengguna saat ini."
                            />
                        </CardTableHeader>
                        <CardTableContent className="p-8">
                            <div className="flex flex-wrap gap-1">
                                {user.role_labels?.map((label, index, arr) => (
                                    <span key={index} className="capitalize text-base">
                                        {label}{index < arr.length - 1 && ","}
                                    </span>
                                ))}
                            </div>
                        </CardTableContent>
                    </CardTable>
                )}

                <CardTable>
                    <CardTableHeader>
                        <CardTableTitle
                            title="Hak Akses (Permissions)"
                            description="Daftar seluruh hak akses yang tersedia di sistem."
                        />
                    </CardTableHeader>
                    <CardTableContent className="p-8">
                        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(groupedPermissions).map(([group, permissions]) => (
                                <div key={group} className="space-y-6">
                                    <h3 className="text-base font-semibold uppercase tracking-wider text-foreground border-b pb-2 flex items-center justify-between">
                                        {group.replace(/-/g, ' ')}
                                        <span className="text-sm font-normal text-muted-foreground tracking-normal lowercase italic">/{group}</span>
                                    </h3>
                                    <div className="grid gap-3.5">
                                        {permissions.map((permission) => {
                                            const isRolePermission = !!user.role_permissions?.includes(permission);
                                            const isChecked = isRolePermission || data.permissions.includes(permission);
                                            
                                            // Handle click carefully: if disabled, don't trigger map
                                            const handleClick = isRolePermission ? undefined : () => togglePermission(permission);

                                            return (
                                                <div key={permission} className={`flex items-center space-x-4 group ${isRolePermission ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`} onClick={handleClick}>
                                                    <Checkbox
                                                        id={permission}
                                                        checked={isChecked}
                                                        disabled={isRolePermission}
                                                        onCheckedChange={handleClick}
                                                        className={`size-5 border-2 transition-colors ${isChecked ? 'bg-primary border-primary' : ''} ${isRolePermission ? 'opacity-80 disabled:opacity-80' : 'data-[state=checked]:bg-primary data-[state=checked]:border-primary'}`}
                                                    />
                                                    <Label
                                                        htmlFor={permission}
                                                        className={`text-sm leading-none transition-all duration-200 select-none capitalize ${isChecked ? 'font-medium text-foreground' : 'text-muted-foreground font-normal hover:text-foreground'} ${isRolePermission ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                    >
                                                        {permission.split('.')[1].replace(/-/g, ' ')}
                                                    </Label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardTableContent>
                </CardTable>
            </div>
        </AppLayout>
    );
}
