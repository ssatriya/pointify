import AppLayout from "@/components/layout/app-layout";
import SearchInput from "@/components/table/search-input";
import TableToolbar from "@/components/table/table-toolbar";
import { Button } from "@/components/ui/button";
import {
    CardTable,
    CardTableActions,
    CardTableContent,
    CardTableHeader,
    CardTableTitle
} from "@/components/ui/card-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Paginated, Class, BreadcrumbItem } from "@/types";
import TablePagination from "@/components/table/table-pagination";
import { useModal } from "@ebay/nice-modal-react";
import CreateClass from "./partials/create-class";
import StudentClassActions from "./partials/student-class-actions";

type Props = {
    classes: Paginated<Class>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard"
    },
    {
        title: "Kelas",
        href: "/dashboard/classes"
    }
]

export default function Classes({ classes }: Props) {
    const { show } = useModal(CreateClass)

    return <AppLayout breadcrumbs={breadcrumbs}>
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Kelas" />
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
                            <TableRow className="h-12">
                                <TableHead>Nama</TableHead>
                                <TableHead>Tingkat</TableHead>
                                <TableHead>Rombel</TableHead>
                                <TableHead>Kejuruan</TableHead>
                                <TableHead className="w-[15%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classes.data.length > 0 ? (
                                classes.data.map((item) => (
                                    <TableRow key={item.id} className="h-12">
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.grade_level.label}</TableCell>
                                        <TableCell>{item.section.label}</TableCell>
                                        <TableCell>{item.vocational_program.label}</TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex justify-end gap-2">
                                                <StudentClassActions id={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Belum ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination links={classes.links} meta={classes.meta} />
                </div>
            </CardTableContent>
        </CardTable>
    </AppLayout>
}