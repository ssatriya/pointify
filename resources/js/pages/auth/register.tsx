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
import { Form, Link } from "@inertiajs/react";
import { login } from "@/routes";
import { store } from "@/routes/register";
import { Loader } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

export default function Register() {
    return (
        <>
            <Form
                {...store.form()}
                resetOnSuccess={["password", "password_confirmation"]}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h1 className="text-2xl font-bold">
                                    Create an account
                                </h1>
                                <p className="text-sm text-balance text-muted-foreground">
                                    Enter your details below to create your
                                    account.
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="name">Nama</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="John Doe"
                                />
                                <FieldError>{errors.name}</FieldError>
                            </Field>
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
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    Konfirmasi password
                                </FieldLabel>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                />
                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </Field>
                            <Field>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Daftar"
                                    )}
                                </Button>
                            </Field>
                            <Field>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link
                                        href={login()}
                                        className="underline underline-offset-4"
                                    >
                                        Log in
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = AuthLayout;
