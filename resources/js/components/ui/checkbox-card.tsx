import type {ComponentProps} from "react";
import {Checkbox as CheckboxPrimitive} from "@base-ui/react/checkbox"
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {Checkbox} from "@/components/ui/checkbox";
import {FieldLabel} from "@/components/ui/field";

const checkboxCardVariants = cva("", {
    variants: {
        variant: {
            destructive: "",
            success: "",
        },
    },
    compoundVariants: [
        {
            variant: "destructive",
            class: [
                // outer
                "has-aria-checked:border-red-600 has-aria-checked:bg-red-50",
                "dark:has-aria-checked:border-red-900 dark:has-aria-checked:bg-red-950",

                // inner
                "data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white",
                "dark:data-[state=checked]:border-red-700 dark:data-[state=checked]:bg-red-700",
            ].join(" "),
        },
        {
            variant: "success",
            class: [
                // outer
                "has-aria-checked:border-green-600 has-aria-checked:bg-green-50",
                "dark:has-aria-checked:border-green-900 dark:has-aria-checked:bg-green-950",

                // inner
                "data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white",
                "dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700",
            ].join(" "),
        },
    ],
    defaultVariants: {
        variant: "success",
    },
});

type CheckboxCardProps = {
    title: string;
    detail?: string;
} & ComponentProps<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxCardVariants>;

export default function CheckboxCard({
                                         className,
                                         variant,
                                         title,
                                         detail,
                                         ...props
                                     }: CheckboxCardProps) {
    return (
        <FieldLabel
            className={cn(
                "w-full dark:bg-input/30 flex items-start gap-3 rounded-lg border border-input p-3",
                checkboxCardVariants({className, variant})
            )}
        >
            <Checkbox
                className={cn(checkboxCardVariants({className, variant}))}
                {...props}
            />
            <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">{title}</p>
                {detail && <p className="text-muted-foreground text-sm">{detail}</p>}
            </div>
        </FieldLabel>
    );
}
