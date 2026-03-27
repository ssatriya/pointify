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
import { store } from "@/actions/App/Http/Controllers/StudentController";
import SearchVocationalProgramController from "@/actions/App/Http/Controllers/SearchVocationalProgramController";
import { Loader } from "lucide-react";
import type { OptionType } from "@/types";
import { ReactAsyncSelect } from "@/components/react-select";
import CheckboxCard from "@/components/ui/checkbox-card";

export default NiceModal.create(() => {
    const { visible, hide, show, remove } = useModal()
    const { visible: confirmVisible, show: confirmShow } = useModal("confirm-dialog")
    const { lastFocusedRef, onFocusCapture } = useFocusRestore(
        visible,
        confirmVisible
    );

    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

    const { data, setData, post, processing, errors, isDirty } = useForm({
        student_number: "",
        name: "",
        vocational_program_id: "",
        is_active: true,
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
                    <DialogTitle>Tambah Siswa</DialogTitle>
                    <DialogDescription>
                        Isi formulir di bawah ini untuk menambahkan data siswa baru ke dalam sistem.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} id="create-student">
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

                        <div className="flex gap-3">
                            <Field className="flex-1">
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
                        </div>

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
                    <Button type="submit" form="create-student" className="min-w-24">
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
