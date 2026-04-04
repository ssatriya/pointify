import { InertiaModal } from "@/components/inertia-modal";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import CheckboxCard from "@/components/ui/checkbox-card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { update } from "@/actions/App/Http/Controllers/AcademicYear/AcademicYearController"
import { toast } from "sonner";

export default function EditAcademicYear({
    academicYear
}: { academicYear: { id: string, name: string, start_date_raw: string, end_date_raw: string, is_active: boolean } }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        name: academicYear.name,
        start_date: academicYear.start_date_raw,
        end_date: academicYear.end_date_raw,
        is_active: academicYear.is_active,
    });

    function submit(e: SyntheticEvent<HTMLFormElement>, close: () => void) {
        e.preventDefault()
        put(update({ academicYear: academicYear.id }).url, {
            onSuccess: () => {
                close()
            },
            onError: (errors) => {
                if (errors.academic_year) {
                    toast.warning(errors.academic_year);
                } else {
                    toast.error("Gagal memperbarui tahun ajaran.");
                }
            }
        })
    }

    return <InertiaModal isDirty={isDirty} className="sm:max-w-xl">
        {({ close }) => (
            <>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => submit(e, close)} id="create-academic-year">
                    <FieldGroup>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <Field>
                                    <FieldLabel htmlFor="start_date">Awal</FieldLabel>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData("start_date", e.target.value)}
                                    />
                                    <FieldError>{errors.start_date}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="end_date">Akhir</FieldLabel>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData("end_date", e.target.value)}
                                    />
                                    <FieldError>{errors.end_date}</FieldError>
                                </Field>
                            </div>
                        </div>
                        <Field>
                            <CheckboxCard
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData("is_active", checked)}
                                title="Status tahun ajaran"
                                detail="Centang jika tahun ajaran masih aktif digunakan."
                            />
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                    <Button type="submit" form="create-academic-year" className="min-w-24">
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
}