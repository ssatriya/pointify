import { Form, Head, Link } from "@inertiajs/react";
import { store } from "@/routes/login";
import { request } from "@/routes/password";
import { register } from "@/routes";
import AuthLayout from "@/components/layout/auth-layout";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Loader } from "lucide-react";

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canRegister,
    canResetPassword,
}: Props) {
    return (
        <>
            <Head title="Masuk" />
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
                                    Masuk ke akun
                                </h1>
                                <p className="text-sm text-pretty text-muted-foreground">
                                    Masukkan email dan kata sandi Anda untuk
                                    masuk.
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="m@example.com"
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Kata sandi
                                    </FieldLabel>
                                    {canResetPassword && (
                                        <Link
                                            href={request()}
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>
                            <Field>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Masuk"
                                    )}
                                </Button>
                            </Field>
                            {canRegister && (
                                <Field>
                                    <FieldDescription className="text-center">
                                        Belum punya akun?{" "}
                                        <Link
                                            href={register()}
                                            className="underline underline-offset-4"
                                        >
                                            Daftar
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            )}
                        </FieldGroup>
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = AuthLayout;
