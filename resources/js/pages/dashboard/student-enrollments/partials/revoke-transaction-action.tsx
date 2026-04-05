import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import RevokeViolationController from "@/actions/App/Http/Controllers/RevokeViolationController";
import RevokeRewardController from "@/actions/App/Http/Controllers/RevokeRewardController";
import { PointTransaction } from "@/types/data-props";
import { SyntheticEvent } from "react";

interface RevokeTransactionActionProps {
    item: PointTransaction;
}

export function RevokeTransactionAction({
    item,
}: RevokeTransactionActionProps) {
    const { data, setData, put, post, processing, reset, errors } = useForm({
        revoke_reason: "",
    });

    const isViolation = item.type === "violation";
    const isReward = item.type === "reward";

    if (!isViolation && !isReward) return null;
    if (item.approval_status === "revoked") return null;

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                toast.success(
                    isViolation
                        ? "Pelanggaran berhasil dibatalkan"
                        : "Prestasi berhasil dibatalkan",
                );
                reset();
            },
            onError: () => {
                toast.error("Gagal membatalkan transaksi");
            },
        };

        if (isViolation) {
            put(RevokeViolationController.url(item.id), options as any);
        } else {
            post(RevokeRewardController.url(item.id), options as any);
        }
    };

    return (
        <AlertDialog onOpenChange={(open) => !open && reset()}>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Batalkan Transaksi"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                }
            />
            <AlertDialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Batalkan {isViolation ? "Pelanggaran" : "Prestasi"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin membatalkan transaksi ini?
                            Tindakan ini akan mengembalikan poin siswa.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-2">
                        <Label htmlFor="revoke_reason">Alasan Pembatalan</Label>
                        <Textarea
                            id="revoke_reason"
                            placeholder="Masukkan alasan mengapa transaksi ini dibatalkan..."
                            value={data.revoke_reason}
                            onChange={(e) =>
                                setData("revoke_reason", e.target.value)
                            }
                            className={
                                errors.revoke_reason
                                    ? "border-destructive focus-visible:ring-destructive"
                                    : ""
                            }
                            required
                        />
                        {errors.revoke_reason && (
                            <p className="text-sm font-medium text-destructive">
                                {errors.revoke_reason}
                            </p>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel type="button">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            type="submit"
                            disabled={processing || !data.revoke_reason}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {processing
                                ? "Memproses..."
                                : "Konfirmasi Pembatalan"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
