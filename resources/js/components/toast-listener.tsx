import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ToastListener() {
    const { flash, errors } = usePage().props as any;

    useEffect(() => {
        if (flash.success) {
            toast.success("Berhasil", {
                description: flash.success,
            });
        }

        if (flash.error) {
            toast.error("Terjadi Kesalahan", {
                description: flash.error,
            });
        }
    }, [flash]);

    return null;
}
