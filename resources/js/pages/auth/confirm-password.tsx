import AuthLayout from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { store } from "@/routes/password/confirm";
import { Form } from "@inertiajs/react";

export default function ConfirmPassword() {
    return (
        <AuthLayout>
            <Form
                {...store.form()}
                resetOnSuccess={["password"]}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h1 className="text-2xl font-bold">
                                    Confirm your password
                                </h1>
                                <p className="text-sm text-balance text-muted-foreground">
                                    This is a secure area of the application.
                                    Please confirm your password before
                                    continuing.
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    autoFocus
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>

                            <Field>
                                <Button type="submit" disabled={processing}>
                                    Konfirmasi password
                                </Button>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
