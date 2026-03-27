import * as React from "react";
import { cn } from "@/lib/utils";

function CardMetric({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn("bg-muted rounded-2xl p-1.5", className)}
            {...props}
        />
    );
}

interface CardMetricTitleProps
    extends Omit<React.ComponentProps<"div">, "title"> {
    title: string | React.ReactNode;
}

function CardMetricTitle({ className, title, ...props }: CardMetricTitleProps) {
    return (
        <div
            data-slot="card-metric-title"
            className={cn(
                "font-medium uppercase tracking-wide text-muted-foreground",
                className
            )}
            {...props}
        >
            {title}
        </div>
    );
}

interface CardMetricContentHeaderProps extends React.ComponentProps<"div"> {
    children: React.ReactNode;
}

function CardMetricContentHeader({
    className,
    children,
    ...props
}: CardMetricContentHeaderProps) {
    return (
        <div
            data-slot="card-metric-content-header"
            className={cn(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardMetricHeaderProps extends React.ComponentProps<"div"> {
    children: React.ReactNode;
}

function CardMetricHeader({
    className,
    children,
    ...props
}: CardMetricHeaderProps) {
    return (
        <div
            data-slot="card-metric-header"
            className={cn("flex px-4 pt-1 pb-2 items-center min-h-[52px]", className)}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardMetricFooterProps extends React.ComponentProps<"div"> {
    children: React.ReactNode;
}

function CardMetricFooter({
    className,
    children,
    ...props
}: CardMetricFooterProps) {
    return (
        <div
            data-slot="card-metric-footer"
            className={cn("flex px-4 pt-2 pb-1 items-center min-h-[52px]", className)}
            {...props}
        >
            {children}
        </div>
    );
}

function CardMetricContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-metric-content"
            className={cn(
                "p-6 rounded-lg border bg-background/70 overflow-clip",
                className
            )}
            {...props}
        />
    );
}

function CardMetricAction({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-metric-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className
            )}
            {...props}
        />
    );
}

export {
    CardMetricContent,
    CardMetric,
    CardMetricTitle,
    CardMetricContentHeader,
    CardMetricHeader,
    CardMetricFooter,
    CardMetricAction,
};
