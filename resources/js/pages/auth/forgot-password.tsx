import AuthLayout from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { email } from "@/routes/password";
import { Form, Head } from "@inertiajs/react";

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Lupa kata sandi" />
            <Form
                {...email.form()}
                resetOnSuccess={["email"]}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h1 className="text-2xl font-bold">
                                    Lupa kata sandi
                                </h1>
                                <p className="text-sm text-pretty text-muted-foreground">
                                    Masukkan email Anda untuk mengatur ulang kata
                                    sandi.
                                </p>

                            {status && (
                                <div className="my-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}
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
                                    Kirim tautan pemulihan
                                </Button>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </>
    );
}

ForgotPassword.layout = AuthLayout;
