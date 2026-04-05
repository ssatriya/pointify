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
import { AsyncCombobox } from "@/components/async-combobox";
import { useForm, useHttp } from "@inertiajs/react";
import { SyntheticEvent, useCallback } from "react";
import type { OptionType } from "@/types";
import SearchStudentEnrollmentController from "@/actions/App/Http/Controllers/SearchStudentEnrollmentController";
import SearchRewardTypeController from "@/actions/App/Http/Controllers/SearchRewardTypeController";
import RewardController from "@/actions/App/Http/Controllers/RewardController";

export default function CreateRewards() {
    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            student_enrollment: null as OptionType | null,
            reward_type: null as OptionType | null,
            notes: "",
        });
    const { get } = useHttp<{}, OptionType[]>();

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

    const loadRewardTypeOptions = useCallback(
        async (inputValue: string): Promise<OptionType[]> => {
            return await get(
                SearchRewardTypeController.url({ query: { q: inputValue } }),
            );
        },
        [],
    );

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            student_enrollment_id: data.student_enrollment?.value,
            reward_type_id: data.reward_type?.value,
        }));

        post(RewardController.url(), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <CardTable>
            <CardTableHeader>
                <CardTableTitle title="Submit Poin Prestasi Siswa" />
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
                            <FieldLabel>Jenis Prestasi</FieldLabel>
                            <AsyncCombobox
                                loadOptions={loadRewardTypeOptions}
                                value={data.reward_type}
                                onChange={(option: any) =>
                                    setData("reward_type", option)
                                }
                                placeholder="Cari jenis prestasi..."
                                isClearable
                                isMulti={false}
                                defaultOptions={true}
                                isInvalid={!!(errors as any).reward_type_id}
                            />
                            <FieldError>
                                {(errors as any).reward_type_id}
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
                                placeholder="Tuliskan catatan prestasi di sini..."
                                rows={4}
                                className="bg-background"
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
                            Simpan Prestasi
                        </Button>
                    </div>
                </form>
            </CardTableContent>
        </CardTable>
    );
}
