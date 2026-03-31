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
import ClassLayout from "@/components/layout/class-layout";
import type { BreadcrumbItem, Class, Paginated, StudentEnrollment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Link, Head } from "@inertiajs/react";
import { studentDetail, index as classIndex } from "@/routes/dashboard/class";
import { useModal } from "@ebay/nice-modal-react";
import createStudentEnrollment from "./partials/create-student-enrollment";
import StudentEnrollmentActions from "./partials/student-enrollment-actions";
import { useFilter } from "@/hooks/use-filter";

type Props = {
    studentClass: Class;
    studentEnrollments: Paginated<StudentEnrollment>;
};

export default function StudentEnrollments({ studentClass, studentEnrollments }: Props) {
    const { show } = useModal(createStudentEnrollment)
    const {
        search,
        setSearch,
        resetFilters
    } = useFilter(classIndex({ studentClass: studentClass.slug }).url);

    return (
        <>
            <Head title={studentClass.name} />
            <CardTable>
                <CardTableHeader>
                    <CardTableTitle title={studentClass.name} />
                    <CardTableActions>
                        <TableToolbar>
                            <SearchInput
                                search={search}
                                setSearch={setSearch}
                                hasSearch={!!search}
                                resetSearch={resetFilters}
                            />
                            <Button variant="outline" onClick={() => show({ studentClassSlug: studentClass.slug, vocationalProgramId: studentClass.vocational_program_id })}>
                                Tambah Siswa
                            </Button>
                        </TableToolbar>
                    </CardTableActions>
                </CardTableHeader>
                <CardTableContent>
                    <div className="overflow-x-auto">
                        <Table className="table-fixed">
                            <TableHeader>
                                <TableRow className="h-12">
                                    <TableHead className="w-[30%] min-w-[200px]">Nama Siswa</TableHead>
                                    <TableHead className="w-[15%] min-w-[150px] text-center">Poin Saat Ini</TableHead>
                                    <TableHead className="w-[15%] min-w-[150px] text-center">Poin Pelanggaran</TableHead>
                                    <TableHead className="w-[15%] min-w-[150px] text-center">Poin Prestasi</TableHead>
                                    <TableHead className="w-[15%] min-w-[150px] text-center">Status</TableHead>
                                    <TableHead className="w-[10%] whitespace-nowrap"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studentEnrollments.data.length > 0 ? (
                                    studentEnrollments.data.map((item) => (
                                        <TableRow key={item.id} className="h-12">
                                            <TableCell>
                                                <Link
                                                    href={studentDetail({ studentClass: studentClass.slug, studentEnrollment: item.id }).url}
                                                    className="hover:underline"
                                                >
                                                    {item.student.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-center">{item.current_points}</TableCell>
                                            <TableCell className="text-center">{item.total_violations_points}</TableCell>
                                            <TableCell className="text-center">{item.total_rewards_points}</TableCell>
                                            <TableCell className="text-center">
                                                {item.is_active ? (
                                                    <Badge variant="success">Aktif</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Nonaktif</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-end">
                                                <div className="flex justify-end gap-2">
                                                    <StudentEnrollmentActions id={item.id} />
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
                        <TablePagination links={studentEnrollments.links} meta={studentEnrollments.meta} />
                    </div>
                </CardTableContent>
            </CardTable>
        </>
    );
}

StudentEnrollments.layout = ({ studentClass }: Props) => [ClassLayout, {
    activeTab: "daftar-siswa",
    breadcrumbs: [
        {
            title: "Dashboard",
            href: ""
        },
    ]
}]
