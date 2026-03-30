import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BreadcrumbItem, StudentEnrollmentSummary } from "@/types";
import { Badge } from "@/components/ui/badge";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as classIndex } from "@/routes/dashboard/class";

type Props = {
    studentEnrollment: StudentEnrollmentSummary;
};

// Dynamic breadcrumbs will be defined inside the component

export default function StudentDetail({ studentEnrollment }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Dashboard",
            href: dashboardIndex().url
        },
        {
            title: studentEnrollment.student_class,
            href: classIndex(studentEnrollment.student_class_slug).url
        },
        {
            title: studentEnrollment.name,
            href: "#"
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Profil Historis: {studentEnrollment.name}</span>
                            {studentEnrollment.is_active ? (
                                <Badge variant="success">Aktif</Badge>
                            ) : (
                                <Badge variant="secondary">Nonaktif</Badge>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm text-muted-foreground">Nomor Induk / NIS</span>
                            <span className="font-semibold">{studentEnrollment.student_number}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm text-muted-foreground">Tahun Akademik</span>
                            <span className="font-semibold">{studentEnrollment.academic_year}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm text-muted-foreground">Kelas</span>
                            <span className="font-semibold">{studentEnrollment.student_class} {studentEnrollment.is_repeating ? "(Mengulang)" : ""}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm text-muted-foreground">Poin Awal</span>
                            <span className="font-semibold">{studentEnrollment.initial_points}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sisa Poin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{studentEnrollment.remaining_points}</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Poin Pelanggaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold text-destructive">
                                {studentEnrollment.total_violations_points}
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Poin Prestasi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold text-success">
                                +{studentEnrollment.total_rewards_points}
                            </span>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat (TBD)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Tabel riwayat pelanggaran dan penghargaan akan ditampilkan di sini.</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
