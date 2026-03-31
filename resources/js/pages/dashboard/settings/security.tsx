import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import AppLayout from "@/components/layout/app-layout";
import SettingsLayout from "@/components/layout/settings-layout";
import SecurityController from "@/actions/App/Http/Controllers/Settings/SecurityController";
import { Heading } from "@/pages/dashboard/settings/partials/heading";
import { PasswordInput } from "@/components/ui/password-input";
import { Form, usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import type { BreadcrumbItem } from "@/types";

export default function Security() {
    return (
        <>
            <Head title="Security settings" />

            <h1 className="sr-only">Security settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Update password"
                    description="Ensure your account is using a long, random password to stay secure"
                />

                <Form
                    {...SecurityController.update.form()}
                    className="space-y-6"
                >
                    {(form) => (
                        <>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="current_password">
                                        Current password
                                    </FieldLabel>
                                    <PasswordInput
                                        id="current_password"
                                        name="current_password"
                                        autoComplete="current-password"
                                        placeholder="Current password"
                                    />
                                    <FieldError>{form.errors.current_password}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">
                                        New password
                                    </FieldLabel>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="New password"
                                    />
                                    <FieldError>{form.errors.password}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password_confirmation">
                                        Confirm password
                                    </FieldLabel>
                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                    />
                                    <FieldError>{form.errors.password_confirmation}</FieldError>
                                </Field>
                            </FieldGroup>

                            <div className="flex items-center gap-4">
                                <Button disabled={form.processing}>
                                    Save password
                                </Button>

                                {form.recentlySuccessful && (
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Saved.
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Security.layout = [
    [AppLayout, {
        breadcrumbs: [
            {
                title: "Dashboard",
                href: "/dashboard",
            },
            {
                title: "Security settings",
                href: "/dashboard/settings/security",
            },
        ]
    }],
    [SettingsLayout]
];