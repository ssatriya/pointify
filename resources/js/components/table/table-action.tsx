import { MouseEventHandler } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ModalLink } from "@inertiaui/modal-react";
import { Loader } from "lucide-react";

interface TableOptionsProps {
    onClickConfirm?: MouseEventHandler<HTMLButtonElement>;
    isPending?: boolean;
    href: string;
}

export default function TableOptions({
    onClickConfirm,
    isPending = false,
    href,
}: TableOptionsProps) {
    return (
        <div className="flex items-center gap-2">
            <ModalLink
                href={href}
                className={buttonVariants({
                    variant: "secondary",
                })}
            >
                {({ loading }) => (
                    <span>
                        {loading ? (
                            <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                            <IconEdit className="h-4 w-4" />
                        )}
                    </span>
                )}
            </ModalLink>
            {onClickConfirm && (
                <AlertDialog>
                    <AlertDialogTrigger render={<Button variant="destructive" />}>
                        <IconTrash className="size-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Data yang dihapus tidak dapat
                                dikembalikan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="min-w-18">Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={onClickConfirm} variant="destructive"
                                disabled={isPending} className="min-w-24">{
                                    isPending ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Lanjutkan"
                                    )
                                }</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}