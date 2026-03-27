import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import { update } from "@/actions/App/Http/Controllers/ViolationTypeController";
import { InertiaModal } from "@/components/inertia-modal";
import { Loader } from "lucide-react";
import type { ViolationType } from "@/types";
import CheckboxCard from "@/components/ui/checkbox-card";

export default function EditViolationType({
    violationType,
}: {
    violationType: ViolationType;
}) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        code: violationType.code,
        description: violationType.description,
        points: violationType.points,
        is_active: violationType.is_active,
    });

    function submit(e: SyntheticEvent<HTMLFormElement>, close: () => void) {
        e.preventDefault()
        put(update({ violationType: violationType.id }).url, {
            onSuccess: () => {
                close()
            }
        })
    }

    return (
        <InertiaModal isDirty={isDirty} className="sm:max-w-xl">
            {({ close }) => (
                <>
                    <DialogHeader>
                        <DialogTitle>Edit Jenis Pelanggaran</DialogTitle>
                        <DialogDescription>
                            Ubah data jenis pelanggaran.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => submit(e, close)} id="edit-violation-type">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="code">Kode Pelanggaran</FieldLabel>
                                <Input
                                    id="code"
                                    value={data.code}
                                    onChange={(e) => setData("code", e.target.value.toUpperCase())}
                                />
                                <FieldError>{errors.code}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="points">Poin</FieldLabel>
                                <Input
                                    id="points"
                                    type="number"
                                    value={data.points}
                                    onChange={(e) => setData("points", parseInt(e.target.value))}
                                />
                                <FieldError>{errors.points}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="description">Keterangan</FieldLabel>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <FieldError>{errors.description}</FieldError>
                            </Field>

                            <Field>
                                <CheckboxCard
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData("is_active", checked)}
                                    title="Status aktif"
                                    detail="Centang jika jenis pelanggaran ini aktif digunakan."
                                />
                            </Field>
                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                        <Button type="submit" form="edit-violation-type" disabled={processing} className="min-w-24">
                            {processing ? (
                                <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                                "Simpan"
                            )}
                        </Button>
                    </DialogFooter>
                </>
            )}
        </InertiaModal>
    );
}
