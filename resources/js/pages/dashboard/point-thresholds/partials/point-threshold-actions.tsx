import TableOptions from "@/components/table/table-action";
import { show } from "@/actions/App/Http/Controllers/PointThresholdController";

export default function PointThresholdActions({ id }: { id: string }) {
    return (
        <TableOptions
            href={show({ pointThreshold: id }).url}
        />
    );
}
