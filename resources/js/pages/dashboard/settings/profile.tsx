import AppLayout from "@/components/layout/app-layout";
import SettingsLayout from "@/components/layout/settings-layout";
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
import { AvatarCropper } from "@/components/avatar-cropper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Heading } from "@/pages/dashboard/settings/partials/heading";
import DeleteUser from "@/pages/dashboard/settings/partials/delete-user";
import { Form, Link, usePage, Head, useForm } from "@inertiajs/react";
import { Loader, Camera } from "lucide-react";
import { useRef, useState } from "react";
import type { Auth } from "@/types";
import React from "react";

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [croppingImage, setCroppingImage] = useState<string | null>(null);
    const photoInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null as File | null,
        _method: 'PATCH',
    });

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCroppingImage(e.target?.result as string);
                // Clear the input value immediately after reading,
                // so selecting the same file again later will trigger onChange.
                if (photoInput.current) {
                    photoInput.current.value = "";
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = (file: File) => {
        setData('avatar', file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotoPreview(e.target?.result as string);
            setCroppingImage(null);
        };
        reader.readAsDataURL(file);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(ProfileController.update.url(), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Profile settings" />
            <h1 className="sr-only">Profile settings</h1>
            <>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Profile information"
                        description="Update your account's profile information and email address."
                    />
                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <FieldLabel>Avatar</FieldLabel>
                            <div className="flex flex-col gap-3">
                                <div className="relative group h-32 w-32">
                                    <Avatar className="h-full w-full border-4 border-background shadow-md transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/10">
                                        <AvatarImage src={photoPreview || auth.user.avatar || undefined} className="object-cover" />
                                        <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground uppercase">
                                            {auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Overlay button */}
                                    <button
                                        type="button"
                                        onClick={() => photoInput.current?.click()}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-full bg-black/60 text-white opacity-0 transition-all duration-300 backdrop-blur-[2px] group-hover:opacity-100"
                                        title="Ubah Avatar"
                                    >
                                        <Camera className="h-6 w-6 animate-in fade-in zoom-in duration-300" />
                                        <span className="text-[10px] font-semibold uppercase tracking-wider">Ubah</span>
                                    </button>

                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={photoInput}
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                        Format: JPG, PNG, atau JPEG.
                                    </p>
                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                                        Maksimal ukuran file 2MB (2048 KB).
                                    </p>
                                </div>
                            </div>
                            <FieldError>{errors.avatar}</FieldError>
                        </div>

                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                                <FieldError>{errors.name}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email address</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>
                        </FieldGroup>
                        {mustVerifyEmail &&
                            auth.user?.email_verified_at === null && (
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Your email address is unverified.{" "}
                                        <Link
                                            href="/email/verification-notification"
                                            method="post"
                                            as="button"
                                            className="underline text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300"
                                        >
                                            Click here to re-send the verification email.
                                        </Link>
                                    </p>

                                    {status === "verification-link-sent" && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}
                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing} className="min-w-20">
                                {processing ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Simpan"
                                )}
                            </Button>
                            {recentlySuccessful && (
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Saved.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
                {auth.user.role !== 'super-admin' && <DeleteUser />}
            </>

            <AvatarCropper
                image={croppingImage}
                open={!!croppingImage}
                onClose={() => setCroppingImage(null)}
                onCrop={handleCrop}
            />
        </>
    );
}

Profile.layout = [
    [AppLayout, {
        breadcrumbs: [
            {
                title: "Dashboard",
                href: "/dashboard",
            },
            {
                title: 'Profile settings',
                href: '/dashboard/settings/profile',
            },
        ],
    }],
    [SettingsLayout]
];
