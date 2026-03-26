import NiceModal, {useModal} from "@ebay/nice-modal-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useForm} from "@inertiajs/react";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CheckboxCard from "@/components/ui/checkbox-card";
import {useFocusRestore} from "@/hooks/use-restore-focus";
import {SyntheticEvent} from "react";
import {store} from "@/actions/App/Http/Controllers/AcademicYear/AcademicYearController"

export default NiceModal.create(() => {
    const {visible, hide, show, remove} = useModal()
    const {visible: confirmVisible, show: confirmShow} = useModal("confirm-modal")
    const {lastFocusedRef, onFocusCapture} = useFocusRestore(
        visible,
        confirmVisible
    );
    const {data, setData, post, processing, errors, isDirty} = useForm({
        start_date: "",
        end_date: "",
        is_active: false,
    });

    function submit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        post(store().url)
        console.log('click')
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
                <form onSubmit={submit} id="create-academic-year">
                    <FieldGroup>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <Field>
                                    <FieldLabel htmlFor="start_date">Awal</FieldLabel>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData("start_date", e.target.value)}
                                    />
                                    <FieldError>{errors.start_date}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="end_date">Akhir</FieldLabel>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData("end_date", e.target.value)}
                                    />
                                    <FieldError>{errors.end_date}</FieldError>
                                </Field>
                            </div>
                        </div>
                        <Field>
                            <CheckboxCard
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData("is_active", checked)}
                                title="Status tahun ajaran"
                                detail="Centang jika tahun ajaran masih aktif digunakan."
                            />
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>}/>
                    <Button type="submit" form="create-academic-year">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})