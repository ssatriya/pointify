import {Link} from "@inertiajs/react";
import {ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight} from "lucide-react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import type {PaginatedLinks, PaginatedMeta} from "@/types";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

type Props = {
    links: PaginatedLinks;
    meta: PaginatedMeta;
    onPageSizeChange?: (pageSize: number) => void;
};

type PaginationButtonProps = {
    href: string | null;
    ariaLabel: string;
    className?: string;
    children: React.ReactNode;
};

function PaginationButton({href, ariaLabel, className, children}: PaginationButtonProps) {
    const baseClass = cn(
        buttonVariants({variant: "outline", size: "icon"}),
        className,
    );

    if (href) {
        return (
            <Link
                href={href}
                aria-label={ariaLabel}
                className={baseClass}
                preserveScroll
                preserveState
            >
                {children}
            </Link>
        );
    }

    return (
        <span
            aria-label={ariaLabel}
            aria-disabled="true"
            className={cn(baseClass, "pointer-events-none opacity-50")}
        >
            {children}
        </span>
    );
}

export default function TablePagination({links, meta, onPageSizeChange}: Props) {
    const isFirstPage = meta.current_page <= 1;
    const isLastPage = meta.current_page >= meta.last_page;

    return (
        <div
            className="flex w-full flex-col-reverse items-center justify-between gap-4 border-t p-2 py-4 text-muted-foreground xl:flex-row xl:gap-8">
            <div className="shrink-0 text-sm">
                {meta.from && meta.to
                    ? `Menampilkan ${meta.from}–${meta.to} dari ${meta.total} data`
                    : "Tidak ada data"}
            </div>

            <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row xl:gap-6">
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap text-sm">Baris per halaman</p>
                    <Select
                        value={`${meta.per_page}`}
                        onValueChange={(value) => onPageSizeChange?.(Number(value))}
                        disabled={meta.last_page === 1 && meta.total <= 10}
                    >
                        <SelectTrigger className="w-18">
                            <SelectValue placeholder={meta.per_page}/>
                        </SelectTrigger>
                        <SelectContent side="top">
                            <SelectGroup>
                                {PAGE_SIZE_OPTIONS.map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 text-sm tabular-nums">
                    <span className="shrink-0">
                        Halaman {meta.current_page} dari {meta.last_page}
                    </span>

                    <div className="flex items-center gap-2">
                        <PaginationButton
                            href={isFirstPage ? null : links.first}
                            ariaLabel="Go to first page"
                            className="hidden lg:flex"
                        >
                            <ChevronsLeft className="size-4"/>
                        </PaginationButton>

                        <PaginationButton
                            href={isFirstPage ? null : links.prev}
                            ariaLabel="Go to previous page"
                        >
                            <ChevronLeft className="size-4"/>
                        </PaginationButton>

                        <PaginationButton
                            href={isLastPage ? null : links.next}
                            ariaLabel="Go to next page"
                        >
                            <ChevronRight className="size-4"/>
                        </PaginationButton>

                        <PaginationButton
                            href={isLastPage ? null : links.last}
                            ariaLabel="Go to last page"
                            className="hidden lg:flex"
                        >
                            <ChevronsRight className="size-4"/>
                        </PaginationButton>
                    </div>
                </div>
            </div>
        </div>
    );
}