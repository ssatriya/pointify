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
import { update } from "@/actions/App/Http/Controllers/StudentClassController";
import SearchVocationalProgramController from "@/actions/App/Http/Controllers/SearchVocationalProgramController";
import { Loader } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OptionType, Class } from "@/types";
import { ReactAsyncSelect } from "@/components/react-select";
import { InertiaModal } from "@/components/inertia-modal";

export default function EditClass({
    class: studentClass
}: { class: Class }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        grade_level: studentClass.grade_level.value.toString(),
        vocational_program_id: studentClass.vocational_program.value.toString(),
        section: studentClass.section?.value.toString() ?? "",
    });

    const [selectedOption, setSelectedOption] = useState<OptionType | null>(studentClass.vocational_program);

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
        put(update({ studentClass: studentClass.id }).url, {
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
                        <DialogTitle>Edit Kelas</DialogTitle>
                        <DialogDescription>
                            Perbarui informasi data kelas di bawah ini.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => submit(e, close)} id="edit-class">
                        <FieldGroup>
                            <div className="flex gap-3">
                                <Field className="w-1/3">
                                    <FieldLabel htmlFor="grade_level">Tingkat</FieldLabel>
                                    <Select
                                        value={data.grade_level}
                                        onValueChange={(value) => setData("grade_level", value ?? "")}
                                    >
                                        <SelectTrigger id="grade_level">
                                            <SelectValue placeholder="Pilih tingkat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="11">11</SelectItem>
                                                <SelectItem value="12">12</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{errors.grade_level}</FieldError>
                                </Field>

                                <Field className="flex-1">
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
                            </div>

                            <Field>
                                <FieldLabel htmlFor="section">Rombel / Suffix (Opsional)</FieldLabel>
                                <Input
                                    id="section"
                                    type="text"
                                    value={data.section}
                                    onChange={(e) => setData("section", e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                                    placeholder="Misal: A, B, atau C"
                                    maxLength={1}
                                />
                                <FieldError>{errors.section}</FieldError>
                            </Field>
                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                        <Button type="submit" form="edit-class" className="min-w-24">
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
