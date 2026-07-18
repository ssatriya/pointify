<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Database\Eloquent\Relations\Relation;

/**
 * @mixin Model
 */
trait Sortable
{
    private string $DEFAULT_ORDER_BY = 'created_at';

    /**
     * Scope for dynamic sorting based on model's sortable fields
     */
    public function scopeSortByField(Builder $query, string $orderBy, string $direction = 'asc'): Builder
    {
        $sortableFields = $this->getSortableAttributes();

        if (! in_array($orderBy, $sortableFields)) {
            $orderBy = $this->DEFAULT_ORDER_BY;
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
        if (! method_exists($this, $relation)) {
            return $query;
        }

        $relationInstance = $this->{$relation}();

        if (! $relationInstance instanceof Relation) {
            return $query;
        }

        $relationModel = $relationInstance->getRelated();
        $relationTable = $relationModel->getTable();
        $parentTable = $this->getTable();

        $subQuery = $relationModel::select("{$relationTable}.{$column}");

        if ($relationInstance instanceof BelongsTo) {
            $foreignKey = $relationInstance->getForeignKeyName();
            $ownerKey = $relationInstance->getOwnerKeyName();
            $subQuery->whereColumn("{$relationTable}.{$ownerKey}", "{$parentTable}.{$foreignKey}");
        } elseif ($relationInstance instanceof HasOneOrMany) {
            $foreignKey = $relationInstance->getForeignKeyName();
            $localKey = $relationInstance->getLocalKeyName();
            $subQuery->whereColumn("{$relationTable}.{$foreignKey}", "{$parentTable}.{$localKey}");
        } else {
            return $query;
        }

        return $query
            ->orderBy($subQuery, $direction)
            ->orderBy("{$parentTable}.id", 'asc');
    }

    /**
     * Get sortable attributes configuration
     */
    protected function getSortableAttributes(): array
    {
        return property_exists($this, 'sortable') ? $this->sortable : ['created_at'];
    }
}
