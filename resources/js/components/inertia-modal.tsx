import { HeadlessModal } from "@inertiaui/modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@ebay/nice-modal-react";
import { useFocusRestore } from "@/hooks/use-restore-focus";
import { ReactNode } from "react";

interface HeadlessModalRef {
    open: () => void;
    close: () => void;
}

interface InertiaModalProps {
    isDirty?: boolean;
    children:
        | ReactNode
        | ((props: { isOpen: boolean; close: () => void }) => ReactNode);
    className?: string;
    ref?: any;
}

function InnerInertiaModal({
    isOpen,
    close,
    isDirty = false,
    children,
    className,
}: {
    isOpen: boolean;
    close: () => void;
    isDirty?: boolean;
    children:
        | ReactNode
        | ((props: { isOpen: boolean; close: () => void }) => ReactNode);
    className?: string;
}) {
    const { visible: confirmVisible, show: confirmShow } =
        useModal("confirm-dialog");
    const { lastFocusedRef, onFocusCapture } = useFocusRestore(
        isOpen,
        confirmVisible,
    );

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open && isDirty) {
                    confirmShow().then(() => close());
                } else if (!open) {
                    close();
                }
            }}
            open={isOpen}
            onOpenChangeComplete={(open) => {
                if (!open) {
                    close();
                }
            }}
        >
            <DialogContent
                initialFocus={isOpen ? undefined : lastFocusedRef}
                onFocusCapture={onFocusCapture}
                className={className}
            >
                {typeof children === "function"
                    ? children({ isOpen, close })
                    : children}
            </DialogContent>
        </Dialog>
    );
}

export function InertiaModal({
    isDirty = false,
    children,
    className,
    ref,
}: InertiaModalProps) {
    return (
        <HeadlessModal ref={ref}>
            {({ isOpen, close }: { isOpen: boolean; close: () => void }) => (
                <InnerInertiaModal
                    isOpen={isOpen}
                    close={close}
                    isDirty={isDirty}
                    className={className}
                >
                    {children}
                </InnerInertiaModal>
            )}
        </HeadlessModal>
    );
}
