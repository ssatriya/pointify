import {
    CardTable,
    CardTableActions,
    CardTableContent,
    CardTableHeader,
    CardTableTitle
} from "@/components/ui/card-table";
import TableToolbar from "@/components/table/table-toolbar";
import SearchInput from "@/components/table/search-input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/components/table/table-pagination";
import AppLayout from "@/components/layout/app-layout";
import { Badge } from "@/components/ui/badge";
import type { BreadcrumbItem, Paginated, User, Auth } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import UserActions from "@/pages/dashboard/users/partials/user-actions";
import { useFilter } from "@/hooks/use-filter";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as usersIndex } from "@/routes/dashboard/users";

type Props = {
    users: Paginated<User>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: dashboardIndex().url
    },
    {
        title: "Pengguna",
        href: usersIndex().url
    }
]

export default function UserIndex({ users }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const {
        search,
        setSearch,
        resetFilters
    } = useFilter(usersIndex().url);

    return (
        <>
            <CardTable>
                <CardTableHeader>
                    <CardTableTitle title="Data Pengguna" />
                    <CardTableActions>
                        <TableToolbar>
                            <SearchInput
                                search={search}
                                setSearch={setSearch}
                                hasSearch={!!search}
                                resetSearch={resetFilters}
                            />
                        </TableToolbar>
                    </CardTableActions>
                </CardTableHeader>
                <CardTableContent>
                    <div className="overflow-clip bg-transparent">
                        <Table className="table-fixed">
                            <TableHeader>
                                <TableRow className="h-12">
                                    <TableHead className="w-[20%] min-w-[150px]">Nama</TableHead>
                                    <TableHead className="w-[30%] min-w-[200px]">Email</TableHead>
                                    <TableHead className="w-[15%] min-w-[120px]">Role</TableHead>
                                    <TableHead className="w-[15%] min-w-[120px]">Hak Akses</TableHead>
                                    <TableHead className="w-[15%] min-w-[150px]">Terdaftar Pada</TableHead>
                                    <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <TableRow key={user.id} className="h-12">
                                            <TableCell>
                                                <span className="text-foreground">{user.name}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-muted-foreground">{user.email}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {user.role_labels?.map((role: string) => (
                                                        <Badge key={role} variant="outline" className="capitalize">
                                                            {role}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm">
                                                    {user.permissions?.length ?? 0} Hak Akses
                                                </span>
                                            </TableCell>
                                            <TableCell>{user.created_at}</TableCell>
                                            <TableCell className="text-end">
                                                <div className="flex justify-end gap-2">
                                                    {user.id !== auth.user?.id && (
                                                        <UserActions id={user.id} />
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            Belum ada data pengguna
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination links={users.links} meta={users.meta} />
                    </div>
                </CardTableContent>
            </CardTable>
        </>
    );
}

UserIndex.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Pengguna",
            href: usersIndex().url
        }
    ]
}