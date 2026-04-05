import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFocusRestore } from "@/hooks/use-restore-focus";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import { store } from "@/actions/App/Http/Controllers/RewardTypeController";
import { Loader } from "lucide-react";
import CheckboxCard from "@/components/ui/checkbox-card";

export default NiceModal.create(() => {
    const { visible, hide, show, remove } = useModal()
    const { visible: confirmVisible, show: confirmShow } = useModal("confirm-dialog")
    const { lastFocusedRef, onFocusCapture } = useFocusRestore(
        visible,
        confirmVisible
    );

    const { data, setData, post, processing, errors, isDirty } = useForm({
        code: "",
        description: "",
        points: "" as string | number,
        is_active: true,
    });

    function submit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        post(store().url, {
            onSuccess: () => {
                hide()
            }
        })
    }

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open && isDirty) {
                    confirmShow()
                        .then(() => hide())
                        .catch(() => show());
                } else if (!open) {
                    hide();
                }
            }}
            open={visible}
            onOpenChangeComplete={(open) => {
                if (!open) {
                    remove();
                }
            }}
        >
            <DialogContent
                initialFocus={visible ?? lastFocusedRef}
                onFocusCapture={onFocusCapture}
                className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Tambah Tipe Prestasi</DialogTitle>
                    <DialogDescription>
                        Tambahkan tipe prestasi baru beserta poin yang diberikan.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} id="create-reward-type">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="code">Kode Prestasi</FieldLabel>
                            <Input
                                id="code"
                                value={data.code}
                                onChange={(e) => setData("code", e.target.value.toUpperCase())}
                                placeholder="Misal: PR001"
                                aria-invalid={!!errors.code}
                            />
                            <FieldError>{errors.code}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="points">Poin</FieldLabel>
                            <Input
                                id="points"
                                type="number"
                                value={data.points}
                                onChange={(e) => setData("points", e.target.value)}
                                placeholder="Misal: 5, 10, 25"
                                aria-invalid={!!errors.points}
                            />
                            <FieldError>{errors.points}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Keterangan</FieldLabel>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Jelaskan detail prestasi"
                                aria-invalid={!!errors.description}
                            />
                            <FieldError>{errors.description}</FieldError>
                        </Field>

                        <Field>
                            <CheckboxCard
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData("is_active", checked)}
                                title="Status aktif"
                                detail="Centang jika tipe prestasi ini aktif digunakan."
                            />
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                    <Button type="submit" form="create-reward-type" className="min-w-24" disabled={processing}>
                        {processing ? (
                            <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                            "Simpan"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})
