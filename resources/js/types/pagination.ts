export type PaginationLink = {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
};

export type PaginatedLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};

export type PaginatedMeta = {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
};

export type Paginated<T> = {
    data: T[];
    links: PaginatedLinks;
    meta: PaginatedMeta;
};