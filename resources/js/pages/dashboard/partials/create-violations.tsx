import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    CardTable,
    CardTableContent,
    CardTableHeader,
    CardTableTitle,
} from "@/components/ui/card-table";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { AsyncCombobox } from "@/components/async-combobox";
import { useForm, useHttp } from "@inertiajs/react";
import {
    SyntheticEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import type { OptionType } from "@/types";
import SearchStudentEnrollmentController from "@/actions/App/Http/Controllers/SearchStudentEnrollmentController";
import SearchViolationTypeController from "@/actions/App/Http/Controllers/SearchViolationTypeController";
import ViolationController from "@/actions/App/Http/Controllers/ViolationController";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CreateViolations() {
    const { get } = useHttp<{}, OptionType[]>();
    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            student_enrollment: null as OptionType | null,
            violation_type: null as OptionType | null,
            notes: "",
        });

    const loadStudentOptions = useCallback(
        async (inputValue: string): Promise<OptionType[]> => {
            return await get(
                SearchStudentEnrollmentController.url({
                    query: { q: inputValue },
                }),
            );
        },
        [],
    );

    const loadViolationTypeOptions = useCallback(
        async (inputValue: string): Promise<OptionType[]> => {
            return await get(
                SearchViolationTypeController.url({ query: { q: inputValue } }),
            );
        },
        [],
    );

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            student_enrollment_id: data.student_enrollment?.value,
            violation_type_id: data.violation_type?.value,
        }));

        post(ViolationController.url(), {
            onSuccess: () => {
                reset();
            },
            onError: (error) => {
                if (error.point_threshold) {
                    toast.warning(error.point_threshold);
                }
            },
        });
    };

    return (
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Buat Pelanggaran Siswa" />
            </CardTableHeader>
            <CardTableContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Pilih Siswa</FieldLabel>
                            <AsyncCombobox
                                loadOptions={loadStudentOptions}
                                value={data.student_enrollment}
                                onChange={(option: any) =>
                                    setData("student_enrollment", option)
                                }
                                placeholder="Cari nama siswa..."
                                isClearable
                                isMulti={false}
                                isInvalid={
                                    !!(errors as any).student_enrollment_id
                                }
                            />
                            <FieldError>
                                {(errors as any).student_enrollment_id}
                            </FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>Jenis Pelanggaran</FieldLabel>
                            <AsyncCombobox
                                loadOptions={loadViolationTypeOptions}
                                value={data.violation_type}
                                onChange={(option: any) =>
                                    setData("violation_type", option)
                                }
                                placeholder="Cari jenis pelanggaran..."
                                isClearable
                                isMulti={false}
                                defaultOptions={true}
                                isInvalid={!!(errors as any).violation_type_id}
                            />
                            <FieldError>
                                {(errors as any).violation_type_id}
                            </FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="notes">Catatan</FieldLabel>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="bg-background"
                                placeholder="Tuliskan catatan pelanggaran di sini..."
                                rows={4}
                                aria-invalid={!!errors.notes}
                            />
                            <FieldError>{errors.notes}</FieldError>
                        </Field>
                    </FieldGroup>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full md:w-auto"
                        >
                            {processing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Simpan"
                            )}
                        </Button>
                    </div>
                </form>
            </CardTableContent>
        </CardTable>
    );
}
