import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { edit } from "@/routes/dashboard/users";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserActions({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);

    function handleDelete() {
        // Implement delete if needed later
        console.log("Delete user", id);
    }

    return (
        <div className="flex items-center gap-2">
            <Link
                href={edit({ user: id }).url}
                className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "group relative"
                )}
            >
                <Loader className="hidden h-4 w-4 animate-spin group-data-loading:block" />
                <IconEdit className="h-4 w-4 group-data-loading:hidden" />
            </Link>
            <AlertDialog>
                <AlertDialogTrigger render={<Button variant="destructive" />}>
                    <IconTrash className="size-4" />
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:min-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription className="text-balance">
                            Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanent dari server dan tidak dapat dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="min-w-18">Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            variant="destructive"
                            disabled={isPending}
                            className="min-w-24"
                        >
                            {isPending ? "Hapus..." : "Lanjutkan"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
