import AuthLayout from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { update } from "@/routes/password";
import { Form } from "@inertiajs/react";

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <AuthLayout>
            <Form
                {...update.form()}
                resetOnSuccess={["password"]}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h1 className="text-2xl font-bold">
                                    Reset password
                                </h1>
                                <p className="text-sm text-balance text-muted-foreground">
                                    Please enter your new password below.
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    readOnly
                                    placeholder="m@example.com"
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    Konfirmasi password
                                </FieldLabel>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                />
                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </Field>
                            <Field>
                                <Button type="submit" disabled={processing}>
                                    Masuk
                                </Button>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
