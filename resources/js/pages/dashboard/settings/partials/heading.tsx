import { cn } from "@/lib/utils";

interface HeadingProps {
    title: string;
    description?: string;
    variant?: "default" | "small";
    className?: string;
}

export function Heading({
    title,
    description,
    variant = "default",
    className,
}: HeadingProps) {
    return (
        <div className={cn("space-y-1.5", className)}>
            <h2
                className={cn(
                    "font-semibold tracking-tight",
                    variant === "default" ? "text-2xl" : "text-lg",
                )}
            >
                {title}
            </h2>
            {description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {description}
                </p>
            )}
        </div>
    );
}
