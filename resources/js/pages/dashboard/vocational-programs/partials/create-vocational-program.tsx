import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFocusRestore } from "@/hooks/use-restore-focus";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import { store } from "@/actions/App/Http/Controllers/VocationalProgramController";
import { Loader } from "lucide-react";

export default NiceModal.create(() => {
    const { visible, hide, show, remove } = useModal()
    const { visible: confirmVisible, show: confirmShow } = useModal("confirm-dialog")
    const { lastFocusedRef, onFocusCapture } = useFocusRestore(
        visible,
        confirmVisible
    );
    const { data, setData, post, processing, errors, isDirty } = useForm({
        name: "",
        abbreviation: "",
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
                } else {
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
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} id="create-vocational-program">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Nama kejuruan</FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                aria-invalid={!!errors.name}
                            />
                            <FieldError>{errors.name}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="abbreviation">Singkatan</FieldLabel>
                            <Input
                                id="abbreviation"
                                type="text"
                                value={data.abbreviation}
                                onChange={(e) => setData("abbreviation", e.target.value)}
                            />
                            <FieldDescription>Hanya gunakan singkatan untuk nama program kejuruan yang panjang, misalnya
                                memiliki lebih dari dua kata.</FieldDescription>
                            <FieldError>{errors.abbreviation}</FieldError>
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                    <Button type="submit" form="create-vocational-program" className="min-w-24">
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