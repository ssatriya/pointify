import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { InertiaLinkProps } from "@inertiajs/react";
import { ControlProps, CSSObjectWithLabel, GroupBase } from "react-select";
import { OptionType } from "@/components/react-select";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
  return typeof url === 'string' ? url : url.url;
}

export const reactSelectBorderStyle = (invalid: boolean) => {
  return {
    control(
      base: CSSObjectWithLabel,
      props: ControlProps<OptionType, false, GroupBase<OptionType>>
    ) {
      if (!invalid) return base;

      return {
        ...base,
        borderColor: "var(--select-invalid-border)",
        boxShadow: "0 0 0 3px var(--select-invalid-ring)",
      };
    },
  };
};