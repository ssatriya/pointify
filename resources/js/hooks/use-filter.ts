import { usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Filters {
    search?: string;
    filter?: string | string[];
    per_page?: string | number;
    sort_by?: string;
    sort_direction?: string;
    [key: string]: any;
}

export function useFilter(route: string) {
    const { filters: initialFilters } = usePage().props as unknown as { filters: Filters };

    // Manage search locally for debouncing
    const [search, setSearch] = useState(initialFilters.search || '');
    const isFirstRender = useRef(true);

    // Sync search with URL (debounced)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            if (search !== (initialFilters.search || '')) {
                handleFilterChange({ search: search || undefined, page: undefined });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const handleFilterChange = useCallback((newFilters: any) => {
        const currentParams = { ...initialFilters };

        // Merge new filters with existing ones
        const params = {
            ...currentParams,
            ...newFilters,
        };

        // Remove empty or undefined parameters
        Object.keys(params).forEach(key => {
            if (params[key] === undefined || params[key] === null || params[key] === '') {
                delete params[key];
            }
        });

        router.get(route, params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            queryStringArrayFormat: 'indices',
        });
    }, [initialFilters, route]);

    const resetFilters = useCallback(() => {
        setSearch('');
        router.get(route, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [route]);

    return {
        filters: initialFilters,
        search,
        setSearch,
        handleFilterChange,
        resetFilters,
    };
}
