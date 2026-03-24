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

export default function ForgotPassword() {
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
                                    Forgot password
                                </h1>
                                <p className="text-sm text-balance text-muted-foreground">
                                    Enter your email to receive a password reset
                                    link
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Alamat email
                                </FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="m@example.com"
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>
                            <Field>
                                <Button type="submit" disabled={processing}>
                                    Kirim email reset password
                                </Button>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
