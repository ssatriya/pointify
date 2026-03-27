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
import { update } from "@/actions/App/Http/Controllers/RewardTypeController";
import { InertiaModal } from "@/components/inertia-modal";
import { Loader } from "lucide-react";
import type { RewardType } from "@/types";
import CheckboxCard from "@/components/ui/checkbox-card";

export default function EditRewardType({
    rewardType,
}: {
    rewardType: RewardType;
}) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        code: rewardType.code,
        description: rewardType.description,
        points: rewardType.points,
        is_active: rewardType.is_active,
    });

    function submit(e: SyntheticEvent<HTMLFormElement>, close: () => void) {
        e.preventDefault()
        put(update({ rewardType: rewardType.id }).url, {
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
                        <DialogTitle>Edit Tipe Prestasi</DialogTitle>
                        <DialogDescription>
                            Ubah data tipe prestasi.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => submit(e, close)} id="edit-reward-type">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="code">Kode Prestasi</FieldLabel>
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
                                    detail="Centang jika tipe prestasi ini aktif digunakan."
                                />
                            </Field>
                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                        <Button type="submit" form="edit-reward-type" disabled={processing} className="min-w-24">
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
