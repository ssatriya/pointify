import { Button } from "@/components/ui/button";
import { Heading } from "@/pages/dashboard/settings/partials/heading";
import { useState } from "react";
import { useModal } from "@ebay/nice-modal-react";
import DeleteUserConfirmation from "@/pages/dashboard/settings/partials/delete-user-confirmation";

export default function DeleteUser() {
    const { show } = useModal(DeleteUserConfirmation);

    return (
        <section className="space-y-6">
            <header>
                <Heading
                    variant="small"
                    title="Delete account"
                    description="Permanently delete your account and all associated data. Once your account is deleted, all of its resources and data will be permanently deleted."
                />
            </header>

            <Button
                variant="destructive"
                onClick={() => show()}
            >
                Delete account
            </Button>
        </section>
    );
}
