import {
    CardTable,
    CardTableActions,
    CardTableContent,
    CardTableHeader,
    CardTableTitle
} from "@/components/ui/card-table";
import TableToolbar from "@/components/table/table-toolbar";
import SearchInput from "@/components/table/search-input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/components/table/table-pagination";
import AppLayout from "@/components/layout/app-layout";
import type { BreadcrumbItem, Paginated, ViolationType } from "@/types";
import { useModal } from "@ebay/nice-modal-react";
import { Badge } from "@/components/ui/badge";
import createViolationType from "./partials/create-violation-type";
import ViolationTypeActions from "./partials/violation-type-actions";

import { useFilter } from "@/hooks/use-filter";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as violationTypesIndex } from "@/routes/dashboard/violation-types";

type Props = {
    violationTypes: Paginated<ViolationType>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: dashboardIndex().url
    },
    {
        title: "Jenis Pelanggaran",
        href: violationTypesIndex().url
    }
]

export default function ViolationTypes({ violationTypes }: Props) {
    const { show } = useModal(createViolationType)
    const {
        search,
        setSearch,
        resetFilters
    } = useFilter(violationTypesIndex().url);

    return (<>
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Jenis Pelanggaran" />
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
                <Table className="min-w-[800px] table-fixed">
                    <TableHeader>
                            <TableRow className="h-12">
                                <TableHead className="w-[10%] min-w-[100px]">Kode</TableHead>
                                <TableHead className="w-[50%] min-w-[250px]">Keterangan</TableHead>
                                <TableHead className="w-[10%] min-w-[100px] text-center">Poin</TableHead>
                                <TableHead className="w-[10%] min-w-[100px] text-center">Status</TableHead>
                                <TableHead className="w-[15%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {violationTypes.data.length > 0 ? (
                                violationTypes.data.map((item) => (
                                    <TableRow key={item.id} className="h-12">
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell className="truncate">{item.description}</TableCell>
                                        <TableCell className="text-center">{item.points}</TableCell>
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
                                                <ViolationTypeActions id={item.id} />
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
                    <TablePagination links={violationTypes.links} meta={violationTypes.meta} />
            </CardTableContent>
        </CardTable>
    </>);
}

ViolationTypes.layout = [AppLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Jenis Pelanggaran",
            href: violationTypesIndex().url
        }
    ]
}]