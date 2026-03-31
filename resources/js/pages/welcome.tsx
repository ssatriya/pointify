import { Head, Link, usePage } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Welcome() {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="Welcome" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground selection:bg-primary selection:text-primary-foreground">
                <div className="absolute top-0 right-0 left-0 flex items-center justify-between p-6">
                    <div className="flex items-center gap-2 font-medium">
                        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Pointify</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className={cn(buttonVariants({ variant: "default" }))}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={cn(buttonVariants({ variant: "outline" }))}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className={cn(buttonVariants({ variant: "default" }))}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <main className="max-w-2xl">
                    <div className="mb-6 inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground ring-1 ring-border">
                        Simplifying student reward and violation systems
                    </div>

                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                        Empowering Schools with <span className="text-primary italic">Pointify</span>
                    </h1>

                    <p className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                        A modern, efficient platform for managing student points, violations, and rewards.
                        Foster a positive school culture with data-driven insights and streamlined workflows.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/register"
                                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-8 text-base")}
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </div>
                </main>

                <footer className="absolute bottom-0 w-full p-6 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Pointify. All rights reserved.
                </footer>
            </div>
        </>
    );
}
