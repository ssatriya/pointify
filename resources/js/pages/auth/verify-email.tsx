import AuthLayout from "@/components/layout/auth-layout";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form, Head, Link } from "@inertiajs/react";
import { logout } from "@/routes";
import { send } from "@/routes/verification";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function VerifyEmail() {
    return (
        <>
            <Head title="Email verification" />
            <Form
                {...send.form()}
                resetOnSuccess={["password"]}
                className="flex flex-col gap-6"
            >
                {({ processing }) => (
                    <>
                        <FieldGroup>
                            <Field>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    variant="secondary"
                                >
                                    {processing ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Kirim ulang email verifikasi"
                                    )}
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
        </>
    );
}

VerifyEmail.layout = AuthLayout;
