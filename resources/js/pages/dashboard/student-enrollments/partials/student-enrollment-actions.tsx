import TableOptions from "@/components/table/table-action";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { destroy, show } from "@/routes/dashboard/student-enrollments";
import { toast } from "sonner";

export default function StudentEnrollmentActions({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);

    function handleDelete() {
        router.delete(destroy({ studentEnrollment: id }).url, {
            preserveScroll: true,
            onStart: () => setIsPending(true),
            onFinish: () => setIsPending(false),
            onError: (errors) => {
                if (errors.student_enrollment) {
                    toast.warning(errors.student_enrollment);
                } else {
                    toast.error("Gagal menghapus pendaftaran siswa.");
                }
            }
        });
    }

    return (
        <TableOptions
            isPending={isPending}
            href={show({ studentEnrollment: id }).url}
            onClickConfirm={handleDelete}
        />
    );
}
