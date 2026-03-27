import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent, useCallback, useState } from "react";
import { update } from "@/actions/App/Http/Controllers/StudentController";
import SearchVocationalProgramController from "@/actions/App/Http/Controllers/SearchVocationalProgramController";
import { Loader } from "lucide-react";
import type { OptionType, Student } from "@/types";
import { ReactAsyncSelect } from "@/components/react-select";
import { InertiaModal } from "@/components/inertia-modal";
import CheckboxCard from "@/components/ui/checkbox-card";

export default function EditStudent({
    student
}: { student: { data: Student } }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        student_number: student.data.student_number,
        name: student.data.name,
        vocational_program_id: student.data.vocational_program.value.toString(),
        is_active: student.data.is_active,
    });

    const [selectedOption, setSelectedOption] = useState<OptionType | null>(student.data.vocational_program);

    const loadOptions = useCallback(async (inputValue: string): Promise<OptionType[]> => {
        const url = SearchVocationalProgramController.url({ query: { q: inputValue } });
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) return [];
        return await response.json();
    }, []);

    function submit(e: SyntheticEvent<HTMLFormElement>, close: () => void) {
        e.preventDefault()
        put(update({ student: student.data.id }).url, {
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
                        <DialogTitle>Edit Siswa</DialogTitle>
                        <DialogDescription>
                            Perbarui informasi data siswa di bawah ini.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => submit(e, close)} id="edit-student">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="Masukkan nama lengkap siswa"
                                />
                                <FieldError>{errors.name}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="student_number">Nomor Induk Siswa (NIS/NISN)</FieldLabel>
                                <Input
                                    id="student_number"
                                    type="text"
                                    value={data.student_number}
                                    onChange={(e) => setData("student_number", e.target.value)}
                                    placeholder="Masukkan NIS/NISN"
                                />
                                <FieldError>{errors.student_number}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="vocational_program_id">Kejuruan</FieldLabel>
                                <ReactAsyncSelect
                                    inputId="vocational_program_id"
                                    loadOptions={loadOptions}
                                    defaultOptions
                                    cacheOptions
                                    placeholder="Pilih kejuruan"
                                    value={selectedOption}
                                    onChange={(selected) => {
                                        if (selected) {
                                            setSelectedOption(selected);
                                            setData("vocational_program_id", selected.value as string);
                                        }
                                    }}
                                />
                                <FieldError>{errors.vocational_program_id}</FieldError>
                            </Field>

                            <Field>
                                <CheckboxCard
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData("is_active", checked)}
                                    title="Status siswa"
                                    detail="Centang jika siswa masih aktif di sekolah."
                                />
                                <FieldError>{errors.is_active}</FieldError>
                            </Field>
                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                        <Button type="submit" form="edit-student" className="min-w-24">
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
    )
}
