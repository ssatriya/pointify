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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFocusRestore } from "@/hooks/use-restore-focus";
import { useForm, useHttp } from "@inertiajs/react";
import { SyntheticEvent, useCallback, useState } from "react";
import { store } from "@/actions/App/Http/Controllers/PointThresholdController";
import SearchAcademicYearController from "@/actions/App/Http/Controllers/SearchAcademicYearController";
import { Loader } from "lucide-react";
import { AsyncCombobox } from "@/components/async-combobox";
import type { OptionType } from "@/types";
import CheckboxCard from "@/components/ui/checkbox-card";

export default NiceModal.create(() => {
    const { visible, hide, show, remove } = useModal()
    const { visible: confirmVisible, show: confirmShow } = useModal("confirm-dialog")
    const { lastFocusedRef, onFocusCapture } = useFocusRestore(
        visible,
        confirmVisible
    );
    const [selectedAcademicYear, setSelectedAcademicYear] = useState<OptionType | null>(null);
    const { data, setData, post, processing, errors, isDirty } = useForm({
        academic_year_id: "",
        cumulative_points_threshold: "" as string | number,
        description: "",
        is_active: true,
    });
    const { get } = useHttp<{}, OptionType[]>()

    const loadAcademicYears = useCallback(async (inputValue: string): Promise<OptionType[]> => {
        return await get(SearchAcademicYearController.url({ query: { q: inputValue } }))
    }, []);

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
                    <DialogTitle>Tambah Batas Poin</DialogTitle>
                    <DialogDescription>
                        Tentukan ambang batas poin kumulatif untuk tahun akademik tertentu.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} id="create-point-threshold">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="academic_year_id">Tahun Akademik</FieldLabel>
                            <AsyncCombobox
                                loadOptions={loadAcademicYears}
                                defaultOptions={true}
                                placeholder="Pilih tahun akademik"
                                value={selectedAcademicYear}
                                onChange={(selected) => {
                                    setSelectedAcademicYear(selected);
                                    setData("academic_year_id", selected?.value?.toString() ?? "");
                                }}
                                isInvalid={!!errors.academic_year_id}
                            />
                            <FieldError>{errors.academic_year_id}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="cumulative_points_threshold">Batas Poin Kumulatif</FieldLabel>
                            <Input
                                id="cumulative_points_threshold"
                                type="number"
                                min="1"
                                value={data.cumulative_points_threshold}
                                onChange={(e) => setData("cumulative_points_threshold", e.target.value)}
                                placeholder="Misal: 25, 50, 75"
                            />
                            <FieldDescription>
                                Input harus lebih tinggi dari ambang batas sebelumnya yang sudah ada.
                            </FieldDescription>
                            <FieldError>{errors.cumulative_points_threshold}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="description">Keterangan (Opsional)</FieldLabel>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Misal: Surat Peringatan 1"
                            />
                            <FieldError>{errors.description}</FieldError>
                        </Field>

                        <Field>
                            <CheckboxCard
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData("is_active", checked)}
                                title="Status aktif"
                                detail="Centang jika ambang batas ini aktif digunakan."
                            />
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                    <Button type="submit" form="create-point-threshold" className="min-w-24" disabled={processing}>
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
