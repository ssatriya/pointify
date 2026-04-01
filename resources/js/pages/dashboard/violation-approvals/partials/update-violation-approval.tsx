import { InertiaModal } from "@/components/inertia-modal";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@ebay/nice-modal-react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import ViolationApprovalController from "@/actions/App/Http/Controllers/ViolationApprovalController";
import createRejectionReason from "./create-rejection-reason";
import {
    User,
    GraduationCap,
    AlertCircle,
    Badge,
    UserCheck,
    Calendar,
    FileText,
    X,
    Check,
    Loader2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Violation {
    id: string;
    student: {
        name: string;
        class: string;
        signature_src: string;
    };
    violation: {
        name: string;
        points: number;
    };
    notes: string;
    approval_status: string;
    created_by: string;
    created_at: string;
}

interface Props {
    violation: Violation;
}

export default function UpdateViolationApproval({ violation }: Props) {
    const { show: showRejectionModal } = useModal(createRejectionReason);
    const { put, processing: isPending } = useForm({
        status: "approved"
    });

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isImageError, setIsImageError] = useState(false);

    const handleApprove = () => {
        put(ViolationApprovalController.update.url(violation.id), {
            onSuccess: (data) => {
                console.log(data)
                toast.success("Pelanggaran Berhasil Disetujui");
            }
        });
    }

    return (
        <InertiaModal className="sm:max-w-3xl">
            <DialogHeader>
                <DialogTitle>Persetujuan Pelanggaran</DialogTitle>
                <DialogDescription>
                    Verifikasi pelanggaran siswa dengan data yang tersedia melalui
                    form di bawah.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                {/* Informasi Siswa */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">
                        Informasi Siswa
                    </h3>
                    <div className="grid gap-4 rounded-lg border bg-muted/30 p-4">
                        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                            <User className="size-4 text-muted-foreground mt-0.5" />
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Nama</p>
                                <p className="font-medium">{violation.student.name}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                            <GraduationCap className="size-4 text-muted-foreground mt-0.5" />
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Kelas</p>
                                <p className="font-medium">{violation.student.class}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Pelanggaran */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">
                        Detail Pelanggaran
                    </h3>
                    <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                <AlertCircle className="size-4 text-muted-foreground mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        Pelanggaran
                                    </p>
                                    <p className="font-medium">{violation.violation.name}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                <Badge className="size-4 text-muted-foreground mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">Poin</p>
                                    <p className="font-medium">{violation.violation.points} poin</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                <UserCheck className="size-4 text-muted-foreground mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        Dibuat oleh
                                    </p>
                                    <p className="font-medium">{violation.created_by}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                <Calendar className="size-4 text-muted-foreground mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        Dibuat pada
                                    </p>
                                    <p className="font-medium">{violation.created_at}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t" />

                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <FileText className="size-4 text-muted-foreground" />
                                <p className="text-xs font-medium text-muted-foreground">
                                    Catatan
                                </p>
                            </div>
                            <div className="rounded-md bg-background border p-3">
                                <p className="text-sm leading-relaxed text-foreground">
                                    {violation.notes || "Tidak ada catatan tambahan."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tanda Tangan Siswa */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">
                        Tanda Tangan Siswa
                    </h3>
                    <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="relative">
                            <Skeleton
                                className={cn(
                                    "w-full h-[130px] rounded transition-opacity duration-300",
                                    !isImageLoading && "hidden"
                                )}
                            />
                            <div
                                className={cn(
                                    "flex items-center justify-center bg-white rounded-md border p-4 min-h-[130px] transition-opacity duration-300",
                                    isImageLoading
                                        ? "opacity-0 absolute inset-0"
                                        : "opacity-100"
                                )}
                            >
                                {isImageError ? (
                                    <div className="max-w-60 text-center text-muted-foreground">
                                        File tanda tangan tidak ditemukan.
                                    </div>
                                ) : (
                                    <img
                                        src={violation.student.signature_src}
                                        alt="Tanda tangan siswa"
                                        className={cn(
                                            "max-w-60 h-auto object-contain",
                                            !isImageError ? "opacity-100" : "opacity-0"
                                        )}
                                        onLoad={() => setIsImageLoading(false)}
                                        onError={() => {
                                            setIsImageLoading(false);
                                            setIsImageError(true);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 sm:flex-initial"
                        onClick={() => showRejectionModal({ violationId: violation.id })}
                        disabled={isPending}
                    >
                        <X className="size-4 mr-2" />
                        Tolak
                    </Button>
                    <Button
                        type="button"
                        className="flex-1"
                        onClick={handleApprove}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="size-4 animate-spin mr-2" />
                        ) : (
                            <>
                                <Check className="size-4 mr-2" />
                                Setujui Pelanggaran
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </InertiaModal>
    );
}
