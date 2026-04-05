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
import { Form, Head } from "@inertiajs/react";

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Konfirmasi Kata Sandi" />
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
                                    Konfirmasi kata sandi
                                </h1>
                                <p className="text-sm text-pretty text-muted-foreground">
                                    Demi keamanan, silakan masukkan kata sandi
                                    Anda sebelum melanjutkan ke halaman ini.
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Kata Sandi
                                </FieldLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan kata sandi Anda"
                                    autoComplete="current-password"
                                    autoFocus
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>

                            <Field>
                                <Button type="submit" disabled={processing}>
                                    Lanjutkan
                                </Button>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = AuthLayout;
