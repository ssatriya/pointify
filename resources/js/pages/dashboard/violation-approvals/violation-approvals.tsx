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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: dashboardIndex().url
    },
    {
        title: "Persetujuan Pelanggaran",
        href: violationApprovalsIndex().url
    }
]

export default function ViolationApprovals({ violations }: Props) {
    const {
        filters,
        search,
        setSearch,
        handleFilterChange,
        resetFilters
    } = useFilter(violationApprovalsIndex().url);

    const statusArray = typeof filters.status === 'string'
        ? filters.status.split(',').filter(Boolean)
        : (Array.isArray(filters.status) ? filters.status : []);

    const handleStatusChange = (values: string[]) => {
        handleFilterChange({
            status: values.join(',') || undefined,
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
                                selectedValues={statusArray}
                                onFilterChange={handleStatusChange}
                            />
                            <SearchInput
                                search={search}
                                setSearch={setSearch}
                                hasSearch={!!search || statusArray.length > 0}
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
                                    <TableHead className="w-[20%]">Nama Siswa</TableHead>
                                    <TableHead className="w-[10%]">Kelas</TableHead>
                                    <TableHead className="w-[25%]">Pelanggaran</TableHead>
                                    <TableHead className="w-[10%]">Poin</TableHead>
                                    <TableHead className="w-[12%]">Dibuat Oleh</TableHead>
                                    <TableHead className="w-[18%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                    <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {violations.data.length > 0 ? (
                                    violations.data.map((item) => (
                                        <TableRow key={item.id} className="h-12">
                                            <TableCell>{item.student.name}</TableCell>
                                            <TableCell>{item.student.class}</TableCell>
                                            <TableCell>{item.violation.name}</TableCell>
                                            <TableCell>{item.violation.points}</TableCell>
                                            <TableCell>{item.created_by}</TableCell>
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
                    </div>
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