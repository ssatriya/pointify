<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

class Filterable
{
    /**
     * Scope to apply filters to the query
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        $filterableFields = $this->getFilterableAttributes();

        foreach ($filters as $field => $values) {
            if (!isset($filterableFields[$field]) || empty($values)) {
                continue;
            }

            $config = $filterableFields[$field];
            $column = $config['column'] ?? $field;
            $type = $config['type'] ?? 'in';

            match ($type) {
                'in' => $query->whereIn($column, (array) $values),
                'exact' => $query->where($column, $values),
                'between' => is_array($values) && count($values) === 2
                    ? $query->whereBetween($column, $values)
                    : $query,
                'relation' => $this->applyRelationFilter($query, $config, $values),
                default => $query,
            };
        }

        return $query;
    }

    /**
     * Apply relationship filter
     */
    protected function applyRelationFilter(Builder $query, array $config, mixed $values): Builder
    {
        $relation = $config['relation'] ?? null;
        $column = $config['column'] ?? 'id';

        if (!$relation) {
            return $query;
        }

        return $query->whereHas($relation, function ($relationQuery) use ($column, $values) {
            $relationQuery->whereIn($column, (array) $values);
        });
    }

    /**
     * Get filterable attributes configuration
     */
    protected function getFilterableAttributes(): array
    {
        return property_exists($this, 'filterable') ? $this->filterable : [];
    }
}