import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Form, usePage } from "@inertiajs/react";
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";

export default NiceModal.create(() => {
    const modal = useModal();

    const handleCancel = () => {
        modal.hide();
    };

    return (
        <AlertDialog
            open={modal.visible}
            onOpenChange={(open) => {
                if (!open) modal.hide();
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Form
                    {...ProfileController.destroy.form()}
                    onSuccess={() => modal.hide()}
                >
                    {(form) => (
                        <>
                            <FieldGroup className="mt-6">
                                <Field>
                                    <FieldLabel htmlFor="password" className="sr-only">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        autoFocus
                                    />
                                    <FieldError>{form.errors.password}</FieldError>
                                </Field>
                            </FieldGroup>

                            <AlertDialogFooter className="mt-6">
                                <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                                <Button
                                    variant="destructive"
                                    disabled={form.processing}
                                    type="submit"
                                >
                                    Delete Account
                                </Button>
                            </AlertDialogFooter>
                        </>
                    )}
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
});
