import AppLayout from "@/components/layout/app-layout";
import { Head } from "@inertiajs/react";
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
import { useFilter } from "@/hooks/use-filter";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as classesIndex } from "@/routes/dashboard/student-classes";

type Props = {
    classes: Paginated<Class>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: dashboardIndex().url
    },
    {
        title: "Kelas",
        href: classesIndex().url
    }
]

export default function Classes({ classes }: Props) {
    const { show } = useModal(CreateClass)
    const {
        search,
        setSearch,
        resetFilters
    } = useFilter(classesIndex().url);

    return <>
        <Head title="Data Kelas" />
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Kelas" />
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
                                <TableHead className="w-[30%]">Nama</TableHead>
                                <TableHead className="w-[15%]">Tingkat</TableHead>
                                <TableHead className="w-[15%]">Rombel</TableHead>
                                <TableHead className="w-[20%]">Kejuruan</TableHead>
                                <TableHead className="w-[15%] min-w-[150px]">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[5%] whitespace-nowrap"></TableHead>
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
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
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
    </>
}

Classes.layout = [AppLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Kelas",
            href: classesIndex().url
        }
    ]
}]
