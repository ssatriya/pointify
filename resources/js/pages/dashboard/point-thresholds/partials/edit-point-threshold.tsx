import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useHttp } from "@inertiajs/react";
import { SyntheticEvent, useCallback, useState } from "react";
import { update } from "@/actions/App/Http/Controllers/PointThresholdController";
import SearchAcademicYearController from "@/actions/App/Http/Controllers/SearchAcademicYearController";
import { InertiaModal } from "@/components/inertia-modal";
import { Loader } from "lucide-react";
import { ReactAsyncSelect } from "@/components/react-select";
import type { OptionType, PointThreshold } from "@/types";
import CheckboxCard from "@/components/ui/checkbox-card";

export default function EditPointThreshold({
    pointThreshold,
}: {
    pointThreshold: PointThreshold;
}) {
    const [selectedAcademicYear, setSelectedAcademicYear] = useState<OptionType | null>(pointThreshold.academic_year);
    const { data, setData, put, processing, errors, isDirty } = useForm({
        academic_year_id: pointThreshold.academic_year.value as string,
        cumulative_points_threshold: pointThreshold.cumulative_points_threshold,
        description: pointThreshold.description || "",
        is_active: pointThreshold.is_active,
    });
    const { get } = useHttp<{}, OptionType[]>()

    const loadAcademicYears = useCallback(async (inputValue: string): Promise<OptionType[]> => {
        return await get(SearchAcademicYearController.url({ query: { q: inputValue } }))
    }, []);

    function submit(e: SyntheticEvent<HTMLFormElement>, close: () => void) {
        e.preventDefault()
        put(update({ pointThreshold: pointThreshold.id }).url, {
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
                        <DialogTitle>Edit Batas Poin</DialogTitle>
                        <DialogDescription>
                            Ubah data ambang batas poin kumulatif.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => submit(e, close)} id="edit-point-threshold">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="academic_year_id">Tahun Akademik</FieldLabel>
                                <ReactAsyncSelect
                                    inputId="academic_year_id"
                                    loadOptions={loadAcademicYears}
                                    defaultOptions
                                    cacheOptions
                                    placeholder="Pilih tahun akademik"
                                    value={selectedAcademicYear}
                                    onChange={(selected) => {
                                        if (selected) {
                                            setSelectedAcademicYear(selected);
                                            setData("academic_year_id", selected.value as string);
                                        }
                                    }}
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
                                    onChange={(e) => setData("cumulative_points_threshold", Number(e.target.value))}
                                />
                                <FieldError>{errors.cumulative_points_threshold}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="description">Keterangan (Opsional)</FieldLabel>
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
                                    detail="Centang jika ambang batas ini aktif digunakan."
                                />
                            </Field>
                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                        <Button type="submit" form="edit-point-threshold" disabled={processing} className="min-w-24">
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
