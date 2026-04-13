import AppLayout from "@/components/layout/app-layout";
import {
    CardTable,
    CardTableActions,
    CardTableContent,
    CardTableHeader,
    CardTableTitle,
} from "@/components/ui/card-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { StudentEnrollmentSummary } from "@/types/data-props";
import { Badge } from "@/components/ui/badge";
import { index as dashboardIndex } from "@/routes/dashboard";
import { index as classIndex } from "@/routes/dashboard/student-enrollments/class";
import { cn } from "@/lib/utils";
import { Head } from "@inertiajs/react";
import {
    School,
    User,
    Hash,
    Calendar,
    Target,
    ShieldAlert,
    Trophy,
    Printer,
    CheckCircle2,
    Clock,
    FileText,
    History as HistoryIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevokeTransactionAction } from "./partials/revoke-transaction-action";

type Props = {
    studentEnrollment: StudentEnrollmentSummary;
};

export default function StudentDetail({ studentEnrollment }: Props) {
    console.log(studentEnrollment);
    return <h1>Hello</h1>;
}

// export default function StudentDetail({ studentEnrollment }: Props) {
//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <>
//             <Head title={`Profil: ${studentEnrollment.name}`} />
//             <style
//                 dangerouslySetInnerHTML={{
//                     __html: `
//                 @media print {
//                     nav, button, .breadcrumb, [data-slot="card-table-actions"] {
//                         display: none !important;
//                     }
//                     .print-only { display: block !important; }
//                     main { padding: 0 !important; }
//                     .card { border: 1px solid #e2e8f0 !important; box-shadow: none !important; }
//                 }
//             `,
//                 }}
//             />

//             <div className="space-y-6">
//                 {/* Profile Information */}
//                 <CardTable>
//                     <CardTableHeader className="border-b bg-muted/30">
//                         <CardTableTitle
//                             title={
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2 rounded-full bg-primary/10 text-primary">
//                                         <User className="h-5 w-5" />
//                                     </div>
//                                     <span className="text-xl font-bold">
//                                         {studentEnrollment.name}
//                                     </span>
//                                 </div>
//                             }
//                             description={
//                                 <div className="flex flex-wrap gap-4 mt-1 items-center">
//                                     <div className="flex items-center gap-1.5 text-xs">
//                                         <Hash className="h-3.5 w-3.5 text-muted-foreground" />
//                                         <span>
//                                             {studentEnrollment.student_number}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//                                         <School className="h-3.5 w-3.5" />
//                                         <span>
//                                             {studentEnrollment.student_class}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//                                         <Calendar className="h-3.5 w-3.5" />
//                                         <span>
//                                             TA {studentEnrollment.academic_year}
//                                         </span>
//                                     </div>
//                                 </div>
//                             }
//                         />
//                         <CardTableActions>
//                             <div className="flex items-center gap-2">
//                                 {studentEnrollment.is_active ? (
//                                     <Badge variant="success" className="px-3">
//                                         Aktif
//                                     </Badge>
//                                 ) : (
//                                     <Badge variant="secondary">Nonaktif</Badge>
//                                 )}
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={handlePrint}
//                                     className="gap-2"
//                                 >
//                                     <Printer className="h-4 w-4" />
//                                     <span>Cetak Laporan</span>
//                                 </Button>
//                             </div>
//                         </CardTableActions>
//                     </CardTableHeader>
//                 </CardTable>
//                 {/* Performance Metrics */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <CardTable>
//                         <CardTableHeader>
//                             <CardTableTitle
//                                 title="Sisa Poin"
//                                 description="Saldo saldo saat ini"
//                             />
//                             <CardTableActions>
//                                 <div
//                                     className={cn(
//                                         "p-2 rounded-lg",
//                                         studentEnrollment.remaining_points > 50
//                                             ? "bg-primary/10 text-primary"
//                                             : "bg-destructive/10 text-destructive",
//                                     )}
//                                 >
//                                     <Target className="h-5 w-5" />
//                                 </div>
//                             </CardTableActions>
//                         </CardTableHeader>
//                         <CardTableContent className="p-6">
//                             <p
//                                 className={cn(
//                                     "text-4xl font-bold tracking-tight",
//                                     studentEnrollment.remaining_points > 50
//                                         ? "text-primary"
//                                         : "text-destructive",
//                                 )}
//                             >
//                                 {studentEnrollment.remaining_points}
//                             </p>
//                         </CardTableContent>
//                     </CardTable>

//                     <CardTable>
//                         <CardTableHeader>
//                             <CardTableTitle
//                                 title="Pelanggaran"
//                                 description="Total akumulasi hukuman"
//                             />
//                             <CardTableActions>
//                                 <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
//                                     <ShieldAlert className="h-5 w-5" />
//                                 </div>
//                             </CardTableActions>
//                         </CardTableHeader>
//                         <CardTableContent className="p-6">
//                             <p className="text-4xl font-bold text-destructive tracking-tight">
//                                 {studentEnrollment.total_violations_points}
//                             </p>
//                         </CardTableContent>
//                     </CardTable>

//                     <CardTable>
//                         <CardTableHeader>
//                             <CardTableTitle
//                                 title="Prestasi"
//                                 description="Total bonus penghargaan"
//                             />
//                             <CardTableActions>
//                                 <div className="p-2 rounded-lg bg-success/10 text-success">
//                                     <Trophy className="h-5 w-5" />
//                                 </div>
//                             </CardTableActions>
//                         </CardTableHeader>
//                         <CardTableContent className="p-6">
//                             <p className="text-4xl font-bold text-success tracking-tight">
//                                 +{studentEnrollment.total_rewards_points}
//                             </p>
//                         </CardTableContent>
//                     </CardTable>
//                 </div>
//                 <div className="space-y-6">
//                     <div className="flex items-center gap-3">
//                         <h2 className="text-lg font-bold tracking-tight uppercase text-muted-foreground/80">
//                             Riwayat Transaksi Poin
//                         </h2>
//                         <div className="h-px flex-1 bg-muted/60" />
//                     </div>

//                     {studentEnrollment.point_transaction_groups &&
//                     studentEnrollment.point_transaction_groups.length > 0 ? (
//                         [...studentEnrollment.point_transaction_groups]
//                             .reverse()
//                             .map((group) => (
//                                 <CardTable
//                                     key={group.id}
//                                     className="transition-all hover:ring-1 ring-primary/20"
//                                 >
//                                     <CardTableHeader className="py-3">
//                                         <CardTableTitle
//                                             title={
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="font-bold bg-muted py-0.5 rounded text-muted-foreground">
//                                                         #{group.sequence}
//                                                     </span>
//                                                     <span className="font-semibold text-base">
//                                                         Periode Penanganan #
//                                                         {group.sequence}
//                                                     </span>
//                                                 </div>
//                                             }
//                                             description={
//                                                 <div className="flex items-center gap-3 mt-1">
//                                                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                                                         {group.is_closed ? (
//                                                             <CheckCircle2 className="h-3.5 w-3.5 text-success" />
//                                                         ) : (
//                                                             <Clock className="h-3.5 w-3.5 animate-pulse text-amber-500" />
//                                                         )}
//                                                         <span>
//                                                             {group.is_closed
//                                                                 ? "Transaksi Ditutup"
//                                                                 : "Sesi Aktif"}
//                                                         </span>
//                                                     </div>
//                                                     {group.has_letter && (
//                                                         <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
//                                                             <FileText className="h-3.5 w-3.5" />
//                                                             <span>
//                                                                 Surat Peringatan
//                                                                 Terbit
//                                                             </span>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             }
//                                         />
//                                         <CardTableActions>
//                                             {!group.is_closed && (
//                                                 <Badge
//                                                     variant="success"
//                                                     className="animate-in fade-in"
//                                                 >
//                                                     Terbaru
//                                                 </Badge>
//                                             )}
//                                         </CardTableActions>
//                                     </CardTableHeader>
//                                     <CardTableContent>
//                                         <Table className="min-w-[1000px]">
//                                             <TableHeader>
//                                                 <TableRow className="h-10 border-b-muted/40">
//                                                     <TableHead className="w-[12%] tracking-wider">
//                                                         Tanggal
//                                                     </TableHead>
//                                                     <TableHead className="w-[10%] text-center tracking-wider">
//                                                         Tipe
//                                                     </TableHead>
//                                                     <TableHead className="w-[8%] tracking-wider">
//                                                         Kode
//                                                     </TableHead>
//                                                     <TableHead className="tracking-wider">
//                                                         Uraian / Catatan
//                                                     </TableHead>
//                                                     <TableHead className="w-[15%] tracking-wider">
//                                                         Petugas
//                                                     </TableHead>
//                                                     <TableHead className="w-[10%] text-center tracking-wider">
//                                                         Skor
//                                                     </TableHead>
//                                                     <TableHead className="w-[10%] text-end tracking-wider pr-4">
//                                                         Saldo Akhir
//                                                     </TableHead>
//                                                     <TableHead className="w-[50px]"></TableHead>
//                                                 </TableRow>
//                                             </TableHeader>
//                                             <TableBody>
//                                                 {group.transactions.map(
//                                                     (item) => (
//                                                         <TableRow
//                                                             key={item.id}
//                                                             className="h-12 border-b-muted/20 hover:bg-muted/5 group"
//                                                         >
//                                                             <TableCell>
//                                                                 {new Intl.DateTimeFormat(
//                                                                     "id-ID",
//                                                                     {
//                                                                         day: "2-digit",
//                                                                         month: "short",
//                                                                         year: "numeric",
//                                                                     },
//                                                                 ).format(
//                                                                     new Date(
//                                                                         item.created_at,
//                                                                     ),
//                                                                 )}
//                                                             </TableCell>
//                                                             <TableCell className="text-center">
//                                                                 {item.type ===
//                                                                 "violation" ? (
//                                                                     <Badge
//                                                                         variant="destructive"
//                                                                         className="h-5 px-1.5 font-bold uppercase rounded"
//                                                                     >
//                                                                         HUKUMAN
//                                                                     </Badge>
//                                                                 ) : item.type ===
//                                                                   "reward" ? (
//                                                                     <Badge
//                                                                         variant="success"
//                                                                         className="h-5 px-1.5 font-bold uppercase rounded"
//                                                                     >
//                                                                         HADIAH
//                                                                     </Badge>
//                                                                 ) : item.type ===
//                                                                   "revoked" ? (
//                                                                     <Badge
//                                                                         variant="outline"
//                                                                         className="h-5 px-1.5 font-bold uppercase rounded text-muted-foreground border-muted-foreground/30"
//                                                                     >
//                                                                         BATAL
//                                                                     </Badge>
//                                                                 ) : (
//                                                                     <Badge
//                                                                         variant="secondary"
//                                                                         className="h-5 px-1.5 font-bold uppercase rounded"
//                                                                     >
//                                                                         RESET
//                                                                     </Badge>
//                                                                 )}
//                                                             </TableCell>
//                                                             <TableCell>
//                                                                 {item.code ||
//                                                                     "—"}
//                                                             </TableCell>
//                                                             <TableCell>
//                                                                 <div className="flex flex-col gap-0.5">
//                                                                     <span className="font-medium leading-tight line-clamp-1">
//                                                                         {item.notes ||
//                                                                             "Keterangan sistem"}
//                                                                     </span>
//                                                                 </div>
//                                                             </TableCell>
//                                                             <TableCell className="truncate">
//                                                                 {
//                                                                     item.created_by
//                                                                 }
//                                                             </TableCell>
//                                                             <TableCell className="text-center">
//                                                                 <span
//                                                                     className={cn(
//                                                                         "font-bold tabular-nums",
//                                                                         item.type ===
//                                                                             "violation"
//                                                                             ? "text-destructive"
//                                                                             : item.type ===
//                                                                                 "reward"
//                                                                               ? "text-success"
//                                                                               : "text-primary",
//                                                                     )}
//                                                                 >
//                                                                     {item.points_change >
//                                                                     0
//                                                                         ? `+${item.points_change}`
//                                                                         : item.points_change}
//                                                                 </span>
//                                                             </TableCell>
//                                                             <TableCell className="text-end font-bold tabular-nums pr-4 text-xs">
//                                                                 {
//                                                                     item.points_after
//                                                                 }
//                                                             </TableCell>
//                                                             <TableCell className="p-0">
//                                                                 <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity pr-2">
//                                                                     <RevokeTransactionAction
//                                                                         item={
//                                                                             item
//                                                                         }
//                                                                     />
//                                                                 </div>
//                                                             </TableCell>
//                                                         </TableRow>
//                                                     ),
//                                                 )}
//                                             </TableBody>
//                                         </Table>
//                                     </CardTableContent>
//                                 </CardTable>
//                             ))
//                     ) : (
//                         <CardTable className="border-dashed border-2 py-10">
//                             <div className="flex flex-col items-center justify-center p-6 text-center">
//                                 <HistoryIcon className="h-10 w-10 text-muted-foreground/30 mb-2" />
//                                 <h3 className="text-sm font-semibold text-muted-foreground/80">
//                                     Belum Ada Transaksi Poin
//                                 </h3>
//                                 <p className="text-xs text-muted-foreground max-w-[240px] mt-1">
//                                     Riwayat pelanggaran dan prestasi siswa akan
//                                     tercantum di sini.
//                                 </p>
//                             </div>
//                         </CardTable>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

StudentDetail.layout = ({ studentEnrollment }: Props) => [
    AppLayout,
    {
        breadcrumbs: [
            {
                title: "Dashboard",
                href: dashboardIndex().url,
            },
            // {
            //     title: studentEnrollment.student_class,
            //     href: classIndex(studentEnrollment.student_class_slug).url,
            // },
            // {
            //     title: studentEnrollment.name,
            //     href: "#",
            // },
        ],
    },
];
