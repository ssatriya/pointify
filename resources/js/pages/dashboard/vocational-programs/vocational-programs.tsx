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
import type { BreadcrumbItem, Paginated, VocationalProgram } from "@/types";
import { useModal } from "@ebay/nice-modal-react";
import CreateVocationalProgram from "@/pages/dashboard/vocational-programs/partials/create-vocational-program";
import VocationalProgramActions from "@/pages/dashboard/vocational-programs/partials/vocational-program-actions";

import { useFilter } from "@/hooks/use-filter";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as vocationalProgramsIndex } from "@/routes/dashboard/vocational-programs";
import { ClientOnly } from "@/components/client-only";

type Props = {
    vocationalPrograms: Paginated<VocationalProgram>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: dashboardIndex().url
    },
    {
        title: "Program Kejuruan",
        href: vocationalProgramsIndex().url
    }
]

export default function VocationalPrograms({ vocationalPrograms }: Props) {
    const { show } = useModal(CreateVocationalProgram)
    const {
        search,
        setSearch,
        resetFilters
    } = useFilter(vocationalProgramsIndex().url);

    return (<>
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Program Kejuruan" />
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
                <Table className="table-fixed min-w-[700px]">
                    <TableHeader>
                            <TableRow className="h-12">
                                <TableHead className="w-[45%] min-w-[200px]">Nama Kejuruan</TableHead>
                                <TableHead className="w-[25%] min-w-[150px]">Singkatan</TableHead>
                                <TableHead className="w-[25%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vocationalPrograms.data.length > 0 ? (
                                vocationalPrograms.data.map((item) => (
                                    <TableRow key={item.id} className="h-12">
                                        <TableCell className="truncate">{item.name}</TableCell>
                                        <TableCell>{item.abbreviation ?? "—"}</TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex justify-end gap-2">
                                                <VocationalProgramActions id={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        Belum ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination links={vocationalPrograms.links} meta={vocationalPrograms.meta} />
            </CardTableContent>
        </CardTable>
    </>)
}

VocationalPrograms.layout = [AppLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Program Kejuruan",
            href: vocationalProgramsIndex().url
        }
    ]
}]