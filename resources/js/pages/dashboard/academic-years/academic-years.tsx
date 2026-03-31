import AppLayout from "@/components/layout/app-layout";
import { Head } from "@inertiajs/react";
import {
    CardTable,
    CardTableHeader,
    CardTableTitle,
    CardTableContent,
    CardTableActions
} from "@/components/ui/card-table";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TableToolbar from "@/components/table/table-toolbar";
import SearchInput from "@/components/table/search-input";
import { Button } from "@/components/ui/button";
import type { Paginated, AcademicYear, BreadcrumbItem } from "@/types";
import { useModal } from "@ebay/nice-modal-react";
import CreateAcademicYear from "@/pages/dashboard/academic-years/partials/create-academic-year";
import { Badge } from "@/components/ui/badge";
import TablePagination from "@/components/table/table-pagination";
import AcademicYearActions from "./partials/academic-year-actions";

import { useFilter } from "@/hooks/use-filter";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as academicYearsIndex } from "@/routes/dashboard/academic-years";

type Props = {
    academicYears: Paginated<AcademicYear>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: dashboardIndex().url
    },
    {
        title: "Tahun Akademik",
        href: academicYearsIndex().url
    }
]

export default function AcademicYears({ academicYears }: Props) {
    const { show } = useModal(CreateAcademicYear)
    const {
        search,
        setSearch,
        resetFilters
    } = useFilter(academicYearsIndex().url);

    return <>
        <Head title="Tahun Akademik" />
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Tahun Akademik" />
                <CardTableActions>
                    <TableToolbar>
                        <SearchInput
                            search={search}
                            setSearch={setSearch}
                            hasSearch={!!search}
                            resetSearch={resetFilters}
                        />
                        <Button variant="outline" onClick={() => show()}>
                            Tambah
                        </Button>
                    </TableToolbar>
                </CardTableActions>
            </CardTableHeader>
            <CardTableContent>
                <div className="overflow-clip bg-transparent">
                    <Table className="table-fixed">
                        <TableHeader>
                            <TableRow className="h-12">
                                <TableHead className="w-[40%]">Tahun Ajaran</TableHead>
                                <TableHead className="w-[15%]">Awal</TableHead>
                                <TableHead className="w-[15%]">Akhir</TableHead>
                                <TableHead className="w-[10%] text-center">Status</TableHead>
                                <TableHead className="w-[15%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {academicYears.data.length > 0 ? (
                                academicYears.data.map((item) => (
                                    <TableRow key={item.id} className="h-12">
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.start_date}</TableCell>
                                        <TableCell>{item.end_date}</TableCell>
                                        <TableCell className="text-center">
                                            {item.is_active ? (
                                                <Badge variant="success">Aktif</Badge>
                                            ) : (
                                                <Badge variant="secondary">Nonaktif</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex justify-end gap-2">
                                                <AcademicYearActions id={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Belum ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination links={academicYears.links} meta={academicYears.meta} />
                </div>
            </CardTableContent>
        </CardTable>
    </>
}

AcademicYears.layout = [AppLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Tahun Akademik",
            href: academicYearsIndex().url
        }
    ]
}]