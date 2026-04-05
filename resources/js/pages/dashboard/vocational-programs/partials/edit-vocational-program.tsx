import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import { update } from "@/actions/App/Http/Controllers/VocationalProgramController";
import { InertiaModal } from "@/components/inertia-modal";
import { Loader } from "lucide-react";

export default function EditVocationalProgram({
    vocationalProgram,
}: {
    vocationalProgram: { id: string; name: string; abbreviation: string };
}) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        name: vocationalProgram.name,
        abbreviation: vocationalProgram.abbreviation,
    });

    function submit(e: SyntheticEvent<HTMLFormElement>, close: () => void) {
        e.preventDefault()
        put(update({ vocationalProgram: vocationalProgram.id }).url, {
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
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => submit(e, close)} id="edit-vocational-program">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Nama kejuruan</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                <FieldError>{errors.name}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="abbreviation">Singkatan</FieldLabel>
                                <Input
                                    id="abbreviation"
                                    type="text"
                                    value={data.abbreviation}
                                    onChange={(e) => setData("abbreviation", e.target.value)}
                                    disabled={data.name.trim().split(/\s+/).filter(Boolean).length <= 1}
                                />
                                <FieldDescription>Hanya gunakan singkatan untuk nama program kejuruan yang panjang,
                                    misalnya
                                    memiliki lebih dari dua kata.</FieldDescription>
                                <FieldError>{errors.abbreviation}</FieldError>
                            </Field>
                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="min-w-18">Batal</Button>} />
                        <Button type="submit" form="edit-vocational-program" disabled={processing} className="min-w-24">
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