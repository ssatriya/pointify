import { Button } from "@/components/ui/button";
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
import { ReactAsyncSelect } from "@/components/react-select";
import { useForm, useHttp } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { OptionType } from "@/types";
import SearchStudentEnrollmentController from "@/actions/App/Http/Controllers/SearchStudentEnrollmentController";
import SearchViolationTypeController from "@/actions/App/Http/Controllers/SearchViolationTypeController";
import ViolationController from "@/actions/App/Http/Controllers/ViolationController";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "sonner";
import { reactSelectBorderStyle } from "@/lib/utils";



export default function CreateViolations() {
    const { get } = useHttp<{}, OptionType[]>()
    const signatureRef = useRef<SignatureCanvas>(null);
    const [hasSignature, setHasSignature] = useState(false);
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        student_enrollment: null as OptionType | null,
        violation_type: null as OptionType | null,
        notes: "",
        student_signature: "",
    });

    const loadStudentOptions = useCallback(async (inputValue: string): Promise<OptionType[]> => {
        return await get(SearchStudentEnrollmentController.url({ query: { q: inputValue } }))
    }, []);

    const loadViolationTypeOptions = useCallback(async (inputValue: string): Promise<OptionType[]> => {
        return await get(SearchViolationTypeController.url({ query: { q: inputValue } }))
    }, []);

    const handleResetSignature = () => {
        signatureRef.current?.clear();
        setData("student_signature", "");
        setHasSignature(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use transform to ensure the latest signature is included
        const signatureData = signatureRef.current && !signatureRef.current.isEmpty()
            ? signatureRef.current.toDataURL("image/png")
            : "";

        transform((data) => ({
            ...data,
            student_enrollment_id: data.student_enrollment?.value,
            violation_type_id: data.violation_type?.value,
            student_signature: signatureData,
        }));

        post(ViolationController.url(), {
            onSuccess: () => {
                reset();
                signatureRef.current?.clear();
                setHasSignature(false);
            },
            onError: (error) => {
                if (error.point_threshold) {
                    toast.warning(error.point_threshold)
                }
            }
        });
    };

    return (
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Submit Pelanggaran Siswa" />
            </CardTableHeader>
            <CardTableContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Pilih Siswa</FieldLabel>
                            <ReactAsyncSelect
                                cacheOptions
                                defaultOptions
                                openMenuOnFocus
                                loadOptions={loadStudentOptions}
                                value={data.student_enrollment}
                                onChange={(option: any) => setData("student_enrollment", option)}
                                placeholder="Cari nama siswa..."
                                isClearable
                                styles={reactSelectBorderStyle(!!(errors as any).student_enrollment_id)}
                            />
                            <FieldError>{(errors as any).student_enrollment_id}</FieldError>


                        </Field>

                        <Field>
                            <FieldLabel>Jenis Pelanggaran</FieldLabel>
                            <ReactAsyncSelect
                                cacheOptions
                                defaultOptions
                                openMenuOnFocus
                                loadOptions={loadViolationTypeOptions}
                                value={data.violation_type}
                                onChange={(option: any) => setData("violation_type", option)}
                                placeholder="Cari jenis pelanggaran..."
                                isClearable
                                styles={reactSelectBorderStyle(!!(errors as any).violation_type_id)}
                            />
                            <FieldError>{(errors as any).violation_type_id}</FieldError>


                        </Field>

                        <Field>
                            <FieldLabel htmlFor="notes">Catatan</FieldLabel>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData("notes", e.target.value)}
                                placeholder="Tuliskan catatan pelanggaran di sini..."
                                rows={4}
                                aria-invalid={!!errors.notes}
                            />
                            <FieldError>{errors.notes}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>Tanda Tangan Siswa</FieldLabel>
                            <div className="border border-border rounded-md overflow-hidden bg-white dark:bg-white relative h-40">
                                <SignatureCanvas
                                    ref={signatureRef}
                                    penColor="black"
                                    backgroundColor="rgba(0,0,0,0)"
                                    canvasProps={{
                                        className: "w-full h-full cursor-crosshair",
                                    }}
                                    onEnd={() => setHasSignature(true)}
                                />

                                {hasSignature && (
                                    <div className="absolute top-2 right-2">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleResetSignature}
                                            className="h-8 text-xs shadow-sm border border-neutral-200 dark:border-neutral-800"
                                        >
                                            Reset Tanda Tangan
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <FieldError>{errors.student_signature}</FieldError>
                        </Field>
                    </FieldGroup>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="w-full md:w-auto">
                            Simpan Pelanggaran
                        </Button>
                    </div>
                </form>
            </CardTableContent>
        </CardTable>
    );
}


