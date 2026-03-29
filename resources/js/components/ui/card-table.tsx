import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CardTableProps extends React.ComponentProps<typeof Card> {
    children: React.ReactNode;
}

function CardTable({ className, children, ...props }: CardTableProps) {
    return (
        <Card
            className={cn(
                "bg-muted p-1.5 pt-0 rounded-2xl flex flex-col justify-between gap-0 border-none shadow-none",
                className
            )}
            {...props}
        >
            {children}
        </Card>
    );
}

interface CardTableHeaderProps extends React.ComponentProps<"div"> {
    children: React.ReactNode;
    direction?: "row" | "col";
}

function CardTableHeader({
    className,
    children,
    direction,
    ...props
}: CardTableHeaderProps) {
    return (
        <div
            data-slot="card-table-header"
            className={cn(
                "p-1.5 px-4 flex gap-2 min-h-[52px]",
                !direction && "flex-col sm:flex-row",
                direction === "col" && "flex-col",
                direction === "row" && "flex-row",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardTableTitleProps
    extends Omit<React.ComponentProps<"div">, "title"> {
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
}

function CardTableTitle({
    className,
    title,
    description,
    ...props
}: CardTableTitleProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col sm:items-start items-center justify-center",
                className
            )}
            {...props}
        >
            <div className="font-medium uppercase tracking-wide">
                {typeof title === "string" ? <h3>{title}</h3> : title}
            </div>
            {description && (
                <div className="text-sm text-muted-foreground text-pretty">
                    {description}
                </div>
            )}
        </div>
    );
}

interface CardTableActionsProps extends React.ComponentProps<"div"> {
    children: React.ReactNode;
}

function CardTableActions({
    className,
    children,
    ...props
}: CardTableActionsProps) {
    return (
        <div
            data-slot="card-table-actions"
            className={cn("flex w-full items-center gap-2 justify-end", className)}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardTableContentProps
    extends React.ComponentProps<typeof CardContent> {
    children: React.ReactNode;
}

function CardTableContent({
    className,
    children,
    ...props
}: CardTableContentProps) {
    return (
        <div
            className={cn(
                "rounded-lg border bg-background/70 overflow-clip",
                className
            )}
        >
            <CardContent className="px-0" {...props}>
                {children}
            </CardContent>
        </div>
    );
}

export {
    CardTable,
    CardTableHeader,
    CardTableTitle,
    CardTableActions,
    CardTableContent,
};
