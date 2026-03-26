import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFocusRestore } from "@/hooks/use-restore-focus";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent, useCallback, useState } from "react";
import { store } from "@/actions/App/Http/Controllers/StudentClassController";
import SearchVocationalProgramController from "@/actions/App/Http/Controllers/SearchVocationalProgramController";
import { Loader } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OptionType } from "@/types";
import { ReactAsyncSelect } from "@/components/react-select";

export default NiceModal.create(() => {
    const { visible, hide, show, remove } = useModal()
    const { visible: confirmVisible, show: confirmShow } = useModal("confirm-dialog")
    const { lastFocusedRef, onFocusCapture } = useFocusRestore(
        visible,
        confirmVisible
    );

    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

    const { data, setData, post, processing, errors, isDirty } = useForm({
        grade_level: "",
        vocational_program_id: "",
        section: "",
    });

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
                className="sm:max-w-xl"
            >
                <DialogHeader>
                    <DialogTitle>Tambah Kelas</DialogTitle>
                    <DialogDescription>
                        Isi formulir di bawah ini untuk menambahkan data kelas baru ke dalam sistem.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} id="create-class">
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
                                    onChange={(option: any) => {
                                        setSelectedOption(option);
                                        setData("vocational_program_id", option?.value ?? "");
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
                    <Button type="submit" form="create-class" className="min-w-24">
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