<?php

namespace App\Facades;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class QueryFilter
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

        if (! empty(trim($searchTerm))) {
            $this->query->search($searchTerm);
        }

        return $this;
    }

    /**
     * Get the results.
     */
    public function get(): Collection
    {
        return $this->query->get();
    }

    /**
     * Get the query builder instance for additional modifications.
     */
    public function getQuery(): Builder
    {
        return $this->query;
    }
}