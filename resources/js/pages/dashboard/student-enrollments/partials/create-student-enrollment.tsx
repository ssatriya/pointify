import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CheckboxCard from "@/components/ui/checkbox-card";
import { ReactAsyncSelect } from "@/components/react-select";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFocusRestore } from "@/hooks/use-restore-focus";
import { useForm, useHttp } from "@inertiajs/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { store } from "@/routes/dashboard/student-enrollments/class";
import { active } from "@/routes/dashboard/academic-years";
import { selectUnenrolled } from "@/routes/dashboard/students";
import { Loader } from "lucide-react";
import type { OptionType } from "@/types";

export default NiceModal.create(({ studentClassSlug, vocationalProgramId }: { studentClassSlug: string, vocationalProgramId: string }) => {
    const { visible, hide, show, remove } = useModal()
    const { visible: confirmVisible, show: confirmShow } = useModal("confirm-dialog")
    const { lastFocusedRef, onFocusCapture } = useFocusRestore(
        visible,
        confirmVisible
    );
    const { get: getAcademicYear } = useHttp<{}, OptionType>()
    const { get: getStudents } = useHttp<{}, OptionType[]>()
    const { data, setData, post, processing, errors, isDirty, setDefaults } = useForm({
        student_id: [] as string[],
        academic_year_id: "",
        is_repeating: false,
        is_active: true,
    });

    const [academicYearName, setAcademicYearName] = useState("Memuat...");


    useEffect(() => {
        if (visible) {
            getAcademicYear(active().url)
                .then(ac => {
                    setDefaults("academic_year_id", ac.value as string);
                    setData("academic_year_id", ac.value as string);
                    setAcademicYearName(ac.label as string);
                })
                .catch(() => {
                    setAcademicYearName("Gagal memuat tahun ajaran aktif");
                });
        }
    }, [visible]);

    const loadOptions = async (inputValue: string) => {
        return await getStudents(
            selectUnenrolled({ vocational_program: vocationalProgramId }).url + `?q=${encodeURIComponent(inputValue)}`
        )
    };

    function submit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        post(store({ studentClass: studentClassSlug }).url, {
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
                className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Tambah Siswa ke Kelas</DialogTitle>
                    <DialogDescription>
                        Tambahkan siswa ke kelas untuk tahun ajaran yang sedang aktif.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} id="create-student-enrollment">
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Siswa</FieldLabel>
                            <ReactAsyncSelect
                                isMulti
                                loadOptions={loadOptions}
                                defaultOptions
                                placeholder="Cari Siswa..."
                                onChange={(selected: any) => {
                                    if (selected) {
                                        setData("student_id", selected.map((s: any) => s.value.toString()));
                                    } else {
                                        setData("student_id", []);
                                    }
                                }}
                            />
                            {errors.student_id && <FieldError>{errors.student_id}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Tahun Akademik Aktif</FieldLabel>
                            <Input
                                value={academicYearName}
                                readOnly
                                disabled
                                className="bg-muted text-muted-foreground"
                            />
                            {errors.academic_year_id && <FieldError>{errors.academic_year_id}</FieldError>}
                        </Field>
                        <div className="grid grid-cols-2 gap-5">
                            <Field className="flex flex-col gap-1.5 [&>label]:font-semibold [&>label]:mb-0 border-none!">
                                <FieldLabel className="mb-0">Status Kenaikan</FieldLabel>
                                <CheckboxCard
                                    title="Mengulang Kelas"
                                    detail="Centang jika siswa ini tinggal di kelas yang sama."
                                    checked={data.is_repeating}
                                    onCheckedChange={(val) => setData('is_repeating', !!val)}
                                    variant="destructive"
                                />
                                {errors.is_repeating && <FieldError>{errors.is_repeating}</FieldError>}
                            </Field>
                            <Field className="flex flex-col gap-1.5 [&>label]:font-semibold [&>label]:mb-0 border-none!">
                                <FieldLabel className="mb-0">Status Pendaftaran</FieldLabel>
                                <CheckboxCard
                                    title="Siswa Aktif"
                                    detail="Centang jika siswa ini masih aktif di sekolah."
                                    checked={data.is_active}
                                    onCheckedChange={(val) => setData('is_active', !!val)}
                                    variant="success"
                                />
                                {errors.is_active && <FieldError>{errors.is_active}</FieldError>}
                            </Field>
                        </div>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                    <Button type="submit" form="create-student-enrollment" className="min-w-24" disabled={processing}>
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
