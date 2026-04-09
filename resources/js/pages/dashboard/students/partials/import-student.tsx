import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useForm } from "@inertiajs/react";
import { SyntheticEvent, useRef } from "react";
import { Download, Upload, Loader, FileSpreadsheet, X } from "lucide-react";
import { downloadTemplate, importMethod } from "@/actions/App/Http/Controllers/StudentImportController";
import { cn } from "@/lib/utils";

export default NiceModal.create(() => {
    const { visible, hide, remove } = useModal()
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        file: null as File | null,
    });

    const submit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(importMethod().url, {
            onSuccess: () => {
                reset();
                hide();
            }
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("file", file);
    };

    return (
        <Dialog
            open={visible}
            onOpenChange={(open) => {
                if (processing) return;
                if (!open) hide();
            }}
            onOpenChangeComplete={(open) => {
                if (!open) remove();
            }}
        >
            <DialogContent
                className="sm:max-w-md"
                showCloseButton={!processing}
            >
                <DialogHeader>
                    <DialogTitle>Impor Data Siswa</DialogTitle>
                    <DialogDescription>
                        Ikuti langkah-langkah di bawah ini untuk mengimpor data siswa.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    {/* Step 1: Download Template */}
                    <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                        <div className="space-y-0.5">
                            <h4 className="text-sm font-medium text-foreground/90">Langkah 1: Download Template</h4>
                            <p className="text-xs text-muted-foreground">
                                Pastikan format data Anda sudah sesuai.
                            </p>
                        </div>
                        <a
                            href={downloadTemplate().url}
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </a>
                    </div>

                    {/* Step 2: Upload File */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-foreground/90">Langkah 2: Upload File Terisi</h4>
                        <div
                            className={cn(
                                "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer",
                                data.file ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                                errors.file && "border-destructive bg-destructive/5"
                            )}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {!data.file ? (
                                <>
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                        <Upload className="h-7 w-7 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Klik untuk memilih file</p>
                                        <p className="mt-1 text-xs text-muted-foreground text-center">
                                            atau tarik dan lepas file .xlsx di sini
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex w-full items-center justify-between gap-3 bg-background/50 rounded-lg border p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                            <FileSpreadsheet className="h-5 w-5" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="truncate text-sm font-medium max-w-[200px]">{data.file.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {(data.file.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-xs"
                                        className="h-8 w-8 rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setData("file", null);
                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                        {errors.file && (
                            <p className="text-xs text-destructive font-medium">{errors.file}</p>
                        )}

                        {/* Row Level Errors */}
                        {Object.keys(errors).filter(key => key !== 'file').length > 0 && (
                            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                                <h5 className="mb-2 text-xs font-semibold text-destructive uppercase tracking-wider">Terjadi Kesalahan pada Data:</h5>
                                <div className="max-h-32 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                    {Object.entries(errors).map(([key, error]) => (
                                        key !== 'file' && (
                                            <p key={key} className="text-sm text-destructive leading-tight flex gap-2">
                                                <span className="shrink-0">•</span>
                                                <span>{error as string}</span>
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" className="min-w-18" disabled={processing}>Batal</Button>} />
                    <Button
                        type="submit"
                        onClick={submit as any}
                        disabled={processing || !data.file}
                        className="min-w-24"
                    >
                        {processing ? (
                            <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="h-4 w-4" />
                        )}
                        Impor Data
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})
