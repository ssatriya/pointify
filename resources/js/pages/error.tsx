import { Head, Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { Home, ArrowLeft, ShieldAlert, Ghost, Search, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    status: number;
}

export default function Error({ status }: Props) {
    const title = {
        503: 'Layanan Tidak Tersedia',
        500: 'Kesalahan Server',
        404: 'Halaman Tidak Ditemukan',
        403: 'Akses Ditolak',
    }[status] || 'Kesalahan';

    const description = {
        503: 'Mohon maaf, layanan kami sedang tidak tersedia untuk sementara waktu. Silakan coba beberapa saat lagi.',
        500: 'Terjadi kesalahan internal pada server kami. Kami sedang berusaha memperbaikinya.',
        404: 'Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
    }[status] || 'Terjadi kesalahan yang tidak terduga.';

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center">
            <Head title={title} />

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
            </div>

            {/* Floating Icons Animation - Using standard CSS/Tailwind */}
            <div className="absolute inset-0 -z-5 pointer-events-none opacity-20">
                <div className="absolute top-[20%] left-[15%] animate-bounce duration-3000">
                    <Search className="size-12 text-primary" />
                </div>
                <div className="absolute bottom-[25%] left-[20%] animate-pulse">
                    <Map className="size-16 text-primary" />
                </div>
                <div className="absolute top-[30%] right-[15%] animate-bounce duration-5000">
                    <ShieldAlert className="size-14 text-primary" />
                </div>
                <div className="absolute bottom-[20%] right-[20%] animate-pulse">
                    <Ghost className="size-12 text-primary" />
                </div>
            </div>

            <div className="relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                    <ShieldAlert className="size-4" />
                    <span>Kode Status: {status}</span>
                </div>

                <h1 className="relative mb-6 text-8xl font-black tracking-tighter sm:text-9xl">
                    <span className="bg-gradient-to-b from-foreground to-foreground/30 bg-clip-text text-transparent opacity-10">
                        {status}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {title}
                    </span>
                </h1>

                <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground sm:text-xl">
                    {description}
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className={cn(buttonVariants({ size: 'lg' }), "h-12 gap-2 px-8")}
                    >
                        <Home className="size-4" />
                        Kembali ke Beranda
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), "h-12 gap-2 px-8")}
                    >
                        <ArrowLeft className="size-4" />
                        Kembali
                    </button>
                </div>
            </div>

            <footer className="absolute bottom-10 left-0 w-full text-center text-sm text-muted-foreground opacity-50">
                &copy; {new Date().getFullYear()} Pointify. Hak cipta dilindungi undang-undang.
            </footer>
        </div>
    );
}
