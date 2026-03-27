import TableOptions from "@/components/table/table-action";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { destroy, show } from "@/actions/App/Http/Controllers/ViolationTypeController";

export default function ViolationTypeActions({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);

    function handleDelete() {
        router.delete(destroy({ violationType: id }).url, {
            preserveScroll: true,
            onStart: () => setIsPending(true),
            onFinish: () => setIsPending(false),
        });
    }

    return (
        <TableOptions
            isPending={isPending}
            href={show({ violationType: id }).url}
            onClickConfirm={handleDelete}
        />
    );
}
