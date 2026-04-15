import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import ViolationApprovalController from "@/actions/App/Http/Controllers/ViolationApprovalController";

export default NiceModal.create(({ violationId, parentModalRef }: { violationId: string, parentModalRef: any }) => {
    const { visible, hide, remove } = useModal();
    const { data, setData, put, processing, errors } = useForm({
        status: "rejected",
        rejection_reason: "",
    });

    function submit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        put(ViolationApprovalController.update.url(violationId), {
            onSuccess: () => {
                toast.success("Pelanggaran berhasil ditolak.");
                hide();
                // @ts-ignore
                parentModalRef.current.close();
            },
        });
    }

    return (
        <Dialog
            open={visible}
            onOpenChange={(open) => {
                if (!open) hide();
            }}
            onOpenChangeComplete={(open) => {
                if (!open) remove();
            }}
        >
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Alasan Penolakan</DialogTitle>
                    <DialogDescription>
                        Berikan alasan mengapa pelanggaran ini ditolak.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} id="create-rejection-reason" className="py-2">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="rejection_reason">Alasan</FieldLabel>
                            <Textarea
                                id="rejection_reason"
                                value={data.rejection_reason}
                                onChange={(e) => setData("rejection_reason", e.target.value)}
                                placeholder="Masukkan alasan penolakan..."
                                className="min-h-[100px]"
                            />
                            <FieldError>{errors.rejection_reason}</FieldError>
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Button variant="outline" onClick={() => hide()} disabled={processing}>
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        form="create-rejection-reason"
                        variant="destructive"
                        disabled={processing}
                    >
                        {processing ? <Loader className="h-4 w-4 animate-spin" /> : "Tolak Pelanggaran"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});
