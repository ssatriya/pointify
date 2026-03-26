import AppLayout from "@/components/layout/app-layout";
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
import type { Paginated, AcademicYear } from "@/types";
import { useModal } from "@ebay/nice-modal-react";
import CreateAcademicYear from "@/pages/dashboard/academic-years/partials/create-academic-year";
import { Badge } from "@/components/ui/badge";
import TablePagination from "@/components/table/table-pagination";
import AcademicYearActions from "./partials/academic-year-actions";

type Props = {
    academicYears: Paginated<AcademicYear>;
};

export default function AcademicYears({ academicYears }: Props) {
    const { show } = useModal(CreateAcademicYear)
    return <AppLayout>
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
                                <TableHead>Tahun Ajaran</TableHead>
                                <TableHead>Awal</TableHead>
                                <TableHead>Akhir</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-end">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {academicYears.data.length > 0 ? (
                                academicYears.data.map((item) => (
                                    <TableRow key={item.id}>
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
                                        <TableCell className="text-end">{item.created_at}</TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex justify-end gap-2">
                                                <AcademicYearActions id={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
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
    </AppLayout>
}