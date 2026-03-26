import {useEffect, useRef} from "react";

export function useFocusRestore(isModalOpen: boolean, isConfirmOpen: boolean) {
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const onFocusCapture = (e: React.FocusEvent<HTMLElement>) => {
        lastFocusedRef.current = e.target as HTMLElement;
    };

    useEffect(() => {
        if (!isConfirmOpen && isModalOpen) {
            requestAnimationFrame(() => {
                const el = lastFocusedRef.current;
                if (el && document.body.contains(el)) {
                    el.focus();
                }
            });
        }
    }, [isConfirmOpen, isModalOpen]);

    return {lastFocusedRef, onFocusCapture};
}
