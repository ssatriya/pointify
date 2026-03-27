import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CheckboxCard from "@/components/ui/checkbox-card";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import { update } from "@/routes/dashboard/student-enrollments";
import { InertiaModal } from "@/components/inertia-modal";
import { Loader } from "lucide-react";
import type { StudentEnrollment } from "@/types";

export default function EditStudentEnrollment({
    studentEnrollment,
}: {
    studentEnrollment: StudentEnrollment;
}) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        student_id: studentEnrollment.student.id,
        academic_year_id: studentEnrollment.academic_year.id,
        is_repeating: studentEnrollment.is_repeating,
        is_active: studentEnrollment.is_active,
    });

    function submit(e: SyntheticEvent<HTMLFormElement>, close: () => void) {
        e.preventDefault()
        put(update({ studentEnrollment: studentEnrollment.id }).url, {
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
                        <DialogTitle>Edit Data Pendaftaran</DialogTitle>
                        <DialogDescription>
                            Ubah data pendaftaran {studentEnrollment.student.name} pada kelas {studentEnrollment.academic_year.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => submit(e, close)} id="edit-student-enrollment">
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Nama Siswa</FieldLabel>
                                <Input
                                    value={studentEnrollment.student.name}
                                    readOnly
                                    disabled
                                    className="bg-muted text-muted-foreground"
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Tahun Akademik</FieldLabel>
                                <Input
                                    value={studentEnrollment.academic_year.name}
                                    readOnly
                                    disabled
                                    className="bg-muted text-muted-foreground"
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
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
                        <Button type="submit" form="edit-student-enrollment" disabled={processing} className="min-w-24">
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
