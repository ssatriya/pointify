import { useRef } from 'react';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
    image: string | null;
    open: boolean;
    onClose: () => void;
    onCrop: (file: File) => void;
}

export function AvatarCropper({ image, open, onClose, onCrop }: Props) {
    const cropperRef = useRef<CropperRef>(null);

    const handleCrop = () => {
        if (cropperRef.current) {
            const canvas = cropperRef.current.getCanvas();
            if (canvas) {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], 'avatar.png', { type: 'image/png' });
                        onCrop(file);
                    }
                }, 'image/png');
            }
        }
    };

    if (!image) return null;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Potong Avatar</DialogTitle>
                </DialogHeader>
                <div className="mt-4 overflow-hidden rounded-lg border bg-neutral-950/50">
                    <Cropper
                        ref={cropperRef}
                        src={image}
                        stencilProps={{
                            aspectRatio: 1,
                        }}
                        className="h-[350px] w-full"
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
