import ViolationApprovalController from "@/actions/App/Http/Controllers/ViolationApprovalController";
import { buttonVariants } from "@/components/ui/button";
import { ModalLink } from "@inertiaui/modal-react";
import { EyeIcon, Loader } from "lucide-react";


export default function ViolationApprovalTableOption({
    id,
}: { id: string }) {
    return (
        <ModalLink
            href={ViolationApprovalController.show.url(id)}
            className={buttonVariants({
                variant: "secondary",
            })}
        >
            {({ loading }) => (
                <span>
                    {loading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        <EyeIcon className="h-4 w-4" />
                    )}
                </span>
            )}
        </ModalLink>

    );
}
