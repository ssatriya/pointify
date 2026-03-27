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

type Props = {
    vocationalPrograms: Paginated<VocationalProgram>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard"
    },
    {
        title: "Program Kejuruan",
        href: "/dashboard/vocational-programs"
    }
]

export default function VocationalPrograms({ vocationalPrograms }: Props) {
    const { show } = useModal(CreateVocationalProgram)
    return (<AppLayout breadcrumbs={breadcrumbs}>
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Tahun Akademik" />
                <CardTableActions>
                    <TableToolbar>
                        <SearchInput
                            search={""}
                            setSearch={(value) => {
                            }}
                            hasSearch={false}
                            resetSearch={() => {
                            }}
                        />
                        <Button variant="outline" onClick={() => show()}>
                            Tambah
                        </Button>
                    </TableToolbar>
                </CardTableActions>
            </CardTableHeader>
            <CardTableContent>
                <div className="overflow-clip bg-transparent">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40%] min-w-[200px]">Nama Kejuruan</TableHead>
                                <TableHead className="w-[30%] min-w-[150px]">Singkatan</TableHead>
                                <TableHead className="w-[30%] min-w-[150px] text-end">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vocationalPrograms.data.length > 0 ? (
                                vocationalPrograms.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.abbreviation ?? "—"}</TableCell>
                                        <TableCell className="text-end">{item.created_at}</TableCell>
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
                </div>
            </CardTableContent>
        </CardTable>
    </AppLayout>)
}