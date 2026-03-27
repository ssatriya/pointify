import AppLayout from "@/components/layout/app-layout";
import SearchInput from "@/components/table/search-input";
import TableToolbar from "@/components/table/table-toolbar";
import { Button } from "@/components/ui/button";
import { CardTable, CardTableActions, CardTableContent, CardTableHeader, CardTableTitle } from "@/components/ui/card-table";
import { useModal } from "@ebay/nice-modal-react";
import CreateStudent from "./partials/create-student";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/components/table/table-pagination";
import type { Paginated, Student } from "@/types";
import StudentActions from "./partials/student-actions";
import { Badge } from "@/components/ui/badge";

type Props = {
    students: Paginated<Student>
}

export default function Students({ students }: Props) {
    const { show } = useModal(CreateStudent)
    return <AppLayout>
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Data Siswa" />
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
                                <TableHead>Nama</TableHead>
                                <TableHead>NIS / NISN</TableHead>
                                <TableHead>Kejuruan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tanggal Dibuat</TableHead>
                                <TableHead className="w-[1%] whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.data.length > 0 ? (
                                students.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.student_number}</TableCell>
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
                    <TablePagination links={students.links} meta={students.meta} />
                </div>
            </CardTableContent>
        </CardTable>
    </AppLayout>
}