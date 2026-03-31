import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/layout/app-layout";
import SettingsLayout from "@/components/layout/settings-layout";
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
import { Heading } from "@/pages/dashboard/settings/partials/heading";
import { Form, Link, usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import type { BreadcrumbItem, Auth } from "@/types";
import DeleteUser from "@/pages/dashboard/settings/partials/delete-user";
import { Loader } from "lucide-react";

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<{ auth: Auth }>().props;
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
                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                            preserveState: true,

                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            key={auth.user.name}
                                            defaultValue={auth.user.name}
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
                                            key={auth.user.email}
                                            defaultValue={auth.user.email}
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
                            </>
                        )}
                    </Form>
                </div>
                {auth.user.role !== 'super-admin' && <DeleteUser />}
            </>
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
