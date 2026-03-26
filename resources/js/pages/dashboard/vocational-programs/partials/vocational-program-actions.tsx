import TableOptions from "@/components/table/table-action";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { destroy, show } from "@/actions/App/Http/Controllers/VocationalProgramController";

export default function VocationalProgramActions({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);

    function handleDelete() {
        router.delete(destroy({ vocationalProgram: id }).url, {
            preserveScroll: true,
            onStart: () => setIsPending(true),
            onFinish: () => setIsPending(false),
        });
    }

    return (
        <TableOptions
            isPending={isPending}
            href={show({ vocationalProgram: id }).url}
            onClickConfirm={handleDelete}
        />
    );
}