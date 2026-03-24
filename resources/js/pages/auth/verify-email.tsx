import AuthLayout from "@/components/layout/auth-layout";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form, Link } from "@inertiajs/react";
import { logout } from "@/routes";
import { send } from "@/routes/verification";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
    return (
        <AuthLayout>
            <Form
                {...send.form()}
                resetOnSuccess={["password"]}
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
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="secondary"
                                >
                                    Kirim ulang verifikasi email
                                </Button>
                            </Field>
                            <Field>
                                <Link
                                    href={logout()}
                                    className="underline underline-offset-4"
                                >
                                    Keluar
                                </Link>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
