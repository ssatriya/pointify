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
import type { BreadcrumbItem, Paginated, RewardType } from "@/types";
import { useModal } from "@ebay/nice-modal-react";
import { Badge } from "@/components/ui/badge";
import createRewardType from "./partials/create-reward-type";
import RewardTypeActions from "./partials/reward-type-actions";

type Props = {
    rewardTypes: Paginated<RewardType>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard"
    },
    {
        title: "Jenis Prestasi",
        href: "/dashboard/reward-types"
    }
]

export default function RewardTypes({ rewardTypes }: Props) {
    const { show } = useModal(createRewardType)

    return (<AppLayout breadcrumbs={breadcrumbs}>
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Jenis Prestasi" />
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
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10%] min-w-[100px]">Kode</TableHead>
                                <TableHead className="w-[50%] min-w-[250px]">Keterangan</TableHead>
                                <TableHead className="w-[10%] min-w-[100px] text-center">Poin</TableHead>
                                <TableHead className="w-[10%] min-w-[100px] text-center">Status</TableHead>
                                <TableHead className="w-[20%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rewardTypes.data.length > 0 ? (
                                rewardTypes.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.description}</TableCell>
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
                                                <RewardTypeActions id={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Data tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination links={rewardTypes.links} meta={rewardTypes.meta} />
                </div>
            </CardTableContent>
        </CardTable>
    </AppLayout>);
}