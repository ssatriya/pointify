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
import type { Paginated, PointThreshold } from "@/types";
import { useModal } from "@ebay/nice-modal-react";
import PointThresholdActions from "@/pages/dashboard/point-thresholds/partials/point-threshold-actions";
import { Badge } from "@/components/ui/badge";
import createPointThreshold from "./partials/create-point-threshold";

type Props = {
    pointThresholds: Paginated<PointThreshold>;
};

export default function PointThresholds({ pointThresholds }: Props) {
    const { show } = useModal(createPointThreshold)

    return (<AppLayout>
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Batas Poin" />
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
                                <TableHead className="w-[20%] min-w-[150px]">Tahun Akademik</TableHead>
                                <TableHead className="w-[15%] min-w-[100px] text-center">Ambang Poin</TableHead>
                                <TableHead className="w-[35%] min-w-[200px]">Keterangan</TableHead>
                                <TableHead className="w-[10%] min-w-[100px] text-center">Status</TableHead>
                                <TableHead className="w-[20%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pointThresholds.data.length > 0 ? (
                                pointThresholds.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.academic_year.label as string}</TableCell>
                                        <TableCell className="text-center">{item.cumulative_points_threshold}</TableCell>
                                        <TableCell className="italic text-muted-foreground">{item.description || "—"}</TableCell>
                                        <TableCell className="text-center">
                                            {item.is_active ? (
                                                <Badge variant="success">Aktif</Badge>
                                            ) : (
                                                <Badge variant="secondary">Non-aktif</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex justify-end gap-2">
                                                <PointThresholdActions id={item.id} />
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
                    <TablePagination links={pointThresholds.links} meta={pointThresholds.meta} />
                </div>
            </CardTableContent>
        </CardTable>
    </AppLayout>)
}