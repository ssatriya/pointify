import AppLayout from "@/components/layout/app-layout";
import React, { Fragment } from "react";
import SearchInput from "@/components/table/search-input";
import TableToolbar from "@/components/table/table-toolbar";
import { Button } from "@/components/ui/button";
import { CardTable, CardTableActions, CardTableContent, CardTableHeader, CardTableTitle } from "@/components/ui/card-table";
import { useModal } from "@ebay/nice-modal-react";
import { useFilter } from "@/hooks/use-filter";
import { Head } from "@inertiajs/react";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as studentsIndex } from "@/routes/dashboard/students";
import CreateStudent from "./partials/create-student";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/components/table/table-pagination";
import type { Paginated, Student } from "@/types";
import StudentActions from "./partials/student-actions";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import ImportStudent from "./partials/import-student";
import TableFilter from "@/components/table/table-filter";

type Props = {
    students: Paginated<Student>
    vocationalPrograms: { id: string, name: string, abbreviation?: string }[]
}

export default function Students({ students, vocationalPrograms = [] }: Props) {
    const { show: showCreate } = useModal(CreateStudent)
    const { show: showImport } = useModal(ImportStudent)
    const {
        filters,
        search,
        setSearch,
        handleFilterChange,
        resetFilters
    } = useFilter(studentsIndex().url);

    const filterArray = typeof filters.filter === 'string'
        ? filters.filter.split(',').filter(Boolean)
        : (Array.isArray(filters.filter) ? filters.filter : []);

    const handleFilterChangeCallback = (values: string[]) => {
        handleFilterChange({
            filter: values.join(',') || undefined,
            page: 1
        });
    };

    return <>
        <Head title="Data Siswa" />
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Siswa" />
                <CardTableActions>
                    <TableToolbar>
                        <TableFilter
                            options={(vocationalPrograms ?? []).map(vp => ({
                                label: vp.abbreviation || vp.name,
                                value: vp.id
                            }))}
                            title="Kejuruan"
                            selectedValues={filterArray}
                            onFilterChange={handleFilterChangeCallback}
                        />
                        <SearchInput
                            search={search}
                            setSearch={setSearch}
                            hasSearch={!!search || filterArray.length > 0}
                            resetSearch={resetFilters}
                        />
                        <Button variant="outline" onClick={() => showImport()}>
                            <Upload className="h-4 w-4" />
                            Impor
                        </Button>
                        <Button variant="outline" onClick={() => showCreate()}>
                            Tambah
                        </Button>
                    </TableToolbar>
                </CardTableActions>
            </CardTableHeader>
            <CardTableContent>
                <Table className="table-fixed min-w-[900px]">
                    <TableHeader>
                        <TableRow className="h-12">
                            <TableHead className="w-[30%]">Nama</TableHead>
                            <TableHead className="w-[20%]">NIS / NISN</TableHead>
                            <TableHead className="w-[20%]">Kejuruan</TableHead>
                            <TableHead className="w-[12%]">Status</TableHead>
                            <TableHead className="w-[15%] min-w-[150px]">Tanggal Dibuat</TableHead>
                            <TableHead className="w-[3%] whitespace-nowrap"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.data.length > 0 ? (
                            (() => {
                                let lastProgram = "";
                                return students.data.map((item) => {
                                    const showHeader = item.vocational_program.label !== lastProgram;
                                    lastProgram = item.vocational_program.label as string;

                                    return (
                                        <Fragment key={item.id}>
                                            {showHeader && (
                                                <TableRow className="bg-muted/30 hover:bg-muted/30 h-10 border-y">
                                                    <TableCell colSpan={6} className="px-4 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground bg-muted/10">
                                                        {item.vocational_program.label}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow className="h-12 border-b">
                                                <TableCell className="truncate">{item.name}</TableCell>
                                                <TableCell>{item.student_number || "-"}</TableCell>
                                                <TableCell>{item.vocational_program.label}</TableCell>
                                                <TableCell>
                                                    {item.is_active ? (
                                                        <Badge variant="success">Aktif</Badge>
                                                    ) : (
                                                        <Badge variant="secondary">Nonaktif</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>{item.created_at}</TableCell>
                                                <TableCell className="text-end">
                                                    <div className="flex justify-end gap-2">
                                                        <StudentActions id={item.id} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    );
                                });
                            })()
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    Belum ada data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination links={students.links} meta={students.meta} />
            </CardTableContent>
        </CardTable>
    </>
}

Students.layout = [AppLayout, {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: "Siswa",
            href: studentsIndex().url
        }
    ]
}]