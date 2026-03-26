<?php

namespace App\Facades;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;


class DataTable
{
    protected Builder $query;

    protected array $params;

    public function __construct(Builder $query, array $params = [])
    {
        $this->query = $query;
        $this->params = $params;
    }

    /**
     * Static factory method.
     */
    public static function make(Builder $query, array $params = []): self
    {
        return new self($query, $params);
    }

    /**
     * Apply search if search term is provided.
     */
    public function search(?string $searchTerm = null): self
    {
        $searchTerm = $searchTerm ?? $this->params['search'] ?? null;

        if (!empty($searchTerm)) {
            $this->query->search($searchTerm);
        }

        return $this;
    }

    /**
     * Apply filters if provided.
     */
    public function filter(array $filters = []): self
    {
        $filters = !empty($filters) ? $filters : $this->params;

        if (!empty($filters) && method_exists($this->query->getModel(), 'scopeFilter')) {
            $this->query->filter($filters);
        }

        return $this;
    }

    /**
     * Apply ordering if sort parameters are provided.
     */
    public function order(?string $sortBy = null, ?string $sortDirection = null): self
    {
        $sortBy = $sortBy ?? $this->params['sort_by'] ?? 'created_at';
        $sortDirection = $sortDirection ?? $this->params['sort_direction'] ?? 'desc';

        $this->query->sortByField($sortBy, $sortDirection);

        return $this;
    }

    /**
     * Apply pagination and return paginated results.
     */
    public function paginate(?int $perPage = null, ?int $page = null): LengthAwarePaginator
    {
        $perPage = $perPage ?? $this->params['per_page'] ?? 15;
        $page = $page ?? $this->params['page'] ?? 1;

        return $this->query->paginate(perPage: $perPage, page: $page);
    }

    /**
     * Get the query builder instance.
     */
    public function getQuery(): Builder
    {
        return $this->query;
    }

    /**
     * One-liner method to apply all operations and return paginated results.
     */
    public function process(): LengthAwarePaginator
    {
        return $this->search()
            ->filter()
            ->order()
            ->paginate();
    }
}