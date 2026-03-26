import TableOptions from "@/components/table/table-action";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { destroy, show } from "@/actions/App/Http/Controllers/StudentClassController";

export default function StudentClassActions({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);

    function handleDelete() {
        router.delete(destroy({ studentClass: id }).url, {
            preserveScroll: true,
            onStart: () => setIsPending(true),
            onFinish: () => setIsPending(false),
        });
    }

    return (
        <TableOptions
            isPending={isPending}
            href={show({ studentClass: id }).url}
            onClickConfirm={handleDelete}
        />
    );
}
