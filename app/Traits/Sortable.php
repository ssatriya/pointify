<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Model
 */
trait Sortable
{
    /**
     * Scope for dynamic sorting based on model's sortable fields
     */
    public function scopeSortByField(Builder $query, string $orderBy, string $direction = 'asc'): Builder
    {
        $sortableFields = $this->getSortableAttributes();

        if (! in_array($orderBy, $sortableFields)) {
            $orderBy = 'created_at'; // fallback
        }

        if (str_contains($orderBy, '.')) {
            [$relation, $column] = explode('.', $orderBy, 2);

            return $this->sortByRelationSubquery($query, $relation, $column, $direction);
        }

        $tableName = $this->getTable();

        return $query
            ->orderBy("{$tableName}.{$orderBy}", $direction)->orderBy("{$tableName}.id", 'asc');
    }

    /**
     * Order by relationship using subquery
     */
    protected function sortByRelationSubquery(Builder $query, string $relation, string $column, string $direction): Builder
    {
        $relationInstance = $this->{$relation}();
        $relationModel = $relationInstance->getRelated();
        $relationTable = $relationModel->getTable();
        $parentTable = $this->getTable();

        $subQuery = $relationModel::select("{$relationTable}.{$column}");

        if (method_exists($relationInstance, 'getForeignKeyName')) {
            $foreignKey = $relationInstance->getForeignKeyName();
            $ownerKey = $relationInstance->getOwnerKeyName();
            $subQuery->whereColumn("{$relationTable}.{$ownerKey}", "{$parentTable}.{$foreignKey}");
        } else {
            $foreignKey = $relationInstance->getForeignKeyName();
            $localKey = $relationInstance->getLocalKeyName();
            $subQuery->whereColumn("{$relationTable}.{$foreignKey}", "{$parentTable}.{$localKey}");
        }

        return $query
            ->orderBy($subQuery, $direction)
            ->orderBy("{$parentTable}.id", 'asc');
    }

    /**
     * Get sortable attributes
     */
    protected function getSortableAttributes(): array
    {
        return property_exists($this, 'sortable') ? $this->sortable : ['created_at'];
    }
}