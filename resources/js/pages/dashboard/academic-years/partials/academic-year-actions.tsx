import TableOptions from "@/components/table/table-action";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { destroy, show } from "@/actions/App/Http/Controllers/AcademicYear/AcademicYearController";
import { toast } from "sonner";

export default function AcademicYearActions({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);

    function handleDelete() {
        router.delete(destroy({ academicYear: id }).url, {
            preserveScroll: true,
            onStart: () => setIsPending(true),
            onFinish: () => setIsPending(false),
            onError: (errors) => {
                if (errors.academic_year) {
                    toast.warning(errors.academic_year);
                }
            }
        });
    }

    return (
        <TableOptions
            isPending={isPending}
            href={show({ academicYear: id }).url}
            onClickConfirm={handleDelete}
        />
    );
}