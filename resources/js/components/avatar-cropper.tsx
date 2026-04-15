import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import getCroppedImg from '@/lib/crop-image';

interface Props {
    image: string | null;
    open: boolean;
    onClose: () => void;
    onCrop: (file: File) => void;
}

export function AvatarCropper({ image, open, onClose, onCrop }: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [pixelCrop, setPixelCrop] = useState<Area | null>(null);

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setPixelCrop(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        if (!image || !pixelCrop) return;

        try {
            const blob = await getCroppedImg(image, pixelCrop);
            if (blob) {
                const file = new File([blob], 'avatar.png', { type: 'image/png' });
                onCrop(file);
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!image) return null;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Potong Avatar</DialogTitle>
                </DialogHeader>
                
                <div className="relative mt-4 h-[350px] w-full overflow-hidden rounded-lg border bg-neutral-950/50">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>

                <div className="mt-4 px-2">
                    <label className="text-sm font-medium text-neutral-500">Zoom</label>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-neutral-900 dark:bg-neutral-800 dark:accent-neutral-50"
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose} type="button">
                        Batal
                    </Button>
                    <Button onClick={handleCrop} type="button">
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AvatarCropper;
