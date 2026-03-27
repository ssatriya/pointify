import NiceModal, { useModal } from "@ebay/nice-modal-react"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default NiceModal.create(() => {
    const modal = useModal("confirm-dialog");

    const handleConfirm = () => {
        modal.resolve?.();
        modal.hide();
    };

    const handleCancel = () => {
        modal.reject?.();
        modal.hide();
    };

    return (
        <AlertDialog
            open={modal.visible}
            onOpenChange={(open) => {
                if (!open) modal.hide();
            }}
        >
            <AlertDialogContent className="sm:min-w-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel} className="min-w-20">Kembali</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} className="min-w-18">Tutup</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
})