import AppLayout from "@/components/layout/app-layout";
import SearchInput from "@/components/table/search-input";
import TableToolbar from "@/components/table/table-toolbar";
import {
    CardTable,
    CardTableActions,
    CardTableContent,
    CardTableHeader,
    CardTableTitle
} from "@/components/ui/card-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Paginated, BreadcrumbItem } from "@/types";
import TablePagination from "@/components/table/table-pagination";
import ViolationApprovalAction from "./partials/violation-approval-action";
import TableFilter from "@/components/table/table-filter";
import { Head } from "@inertiajs/react";
import { useFilter } from "@/hooks/use-filter";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as violationApprovalsIndex } from "@/routes/dashboard/violations/approval";

interface Violation {
    id: string;
    student: {
        name: string;
        class: string;
        abbreviation?: string;
        signature_src: string;
    };
    violation: {
        name: string;
        points: number;
    };
    notes: string;
    approval_status: string;
    created_by: string;
    created_at: string;
}

type Props = {
    violations: Paginated<Violation>;
};

export default function ViolationApprovals({ violations }: Props) {
    const {
        filters,
        search,
        setSearch,
        handleFilterChange,
        resetFilters
    } = useFilter(violationApprovalsIndex().url);

    const filterArray = typeof filters.filter === 'string'
        ? filters.filter.split(',').filter(Boolean)
        : (Array.isArray(filters.filter) ? filters.filter : []);

    const handleFilterChangeCallback = (values: string[]) => {
        handleFilterChange({
            filter: values.join(',') || undefined,
            page: 1
        });
    };

    return (
        <>
            <Head title="Persetujuan Pelanggaran" />
            <CardTable>
                <CardTableHeader>
                    <CardTableTitle title="Persetujuan Pelanggaran" />
                    <CardTableActions>
                        <TableToolbar>
                            <TableFilter
                                options={[
                                    { label: "Menunggu", value: "pending" },
                                    { label: "Disetujui", value: "approved" },
                                    { label: "Ditolak", value: "rejected" },
                                ]}
                                title="Status"
                                selectedValues={filterArray}
                                onFilterChange={handleFilterChangeCallback}
                            />
                            <SearchInput
                                search={search}
                                setSearch={setSearch}
                                hasSearch={!!search || filterArray.length > 0}
                                resetSearch={resetFilters}
                            />
                        </TableToolbar>
                    </CardTableActions>
                </CardTableHeader>
                <CardTableContent>
                    <Table className="min-w-[900px] table-fixed">
                        <TableHeader>
                            <TableRow className="h-12">
                                <TableHead className="w-[20%]">Nama Siswa</TableHead>
                                <TableHead className="w-[12%]">Kelas</TableHead>
                                <TableHead className="w-[25%]">Pelanggaran</TableHead>
                                <TableHead className="w-[8%] text-center">Poin</TableHead>
                                <TableHead className="w-[15%]">Dibuat Oleh</TableHead>
                                <TableHead className="w-[15%]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[5%]"></TableHead>
                            </TableRow>
                        </TableHeader>
                            <TableBody>
                                {violations.data.length > 0 ? (
                                    violations.data.map((item) => (
                                        <TableRow key={item.id} className="h-12">
                                            <TableCell className="truncate">{item.student.name}</TableCell>
                                            <TableCell>{item.student.abbreviation || item.student.class}</TableCell>
                                            <TableCell className="truncate">{item.violation.name}</TableCell>
                                            <TableCell>{item.violation.points}</TableCell>
                                            <TableCell className="truncate">{item.created_by}</TableCell>
                                            <TableCell>{item.created_at}</TableCell>
                                            <TableCell className="text-end">
                                                <div className="flex justify-end gap-2">
                                                    <ViolationApprovalAction
                                                        id={item.id}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            Belum ada data
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination links={violations.links} meta={violations.meta} />
                </CardTableContent>
            </CardTable>
        </>
    );
}

ViolationApprovals.layout = [AppLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Persetujuan Pelanggaran",
            href: violationApprovalsIndex().url
        }
    ]
}]