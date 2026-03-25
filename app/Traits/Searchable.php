<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Model
 */
class Searchable
{
    /**
     * Scope to search across model attributes and relationships (case-insensitive).
     */
    public function scopeSearch(Builder $query, string $term): Builder
    {
        if (empty($term)) {
            return $query;
        }

        $searchableAttributes = $this->getSearchableAttributes();
        $parentTable = $this->getTable();
        $lowerTerm = strtolower($term);

        $query->where(function ($subQuery) use ($searchableAttributes, $lowerTerm, $parentTable) {
            foreach ($searchableAttributes as $attribute) {
                if (strpos($attribute, '.') !== false) {
                    [$relationName, $relationAttribute] = explode('.', $attribute, 2);
                    $subQuery->orWhereHas($relationName, function ($relationQuery) use ($relationAttribute, $lowerTerm) {
                        $relatedTable = $relationQuery->getModel()->getTable();
                        $relationQuery->whereRaw("LOWER({$relatedTable}.{$relationAttribute}) LIKE ?", ["%{$lowerTerm}%"]);
                    });
                } else {
                    $subQuery->orWhereRaw("LOWER({$parentTable}.{$attribute}) LIKE ?", ["%{$lowerTerm}%"]);
                }
            }
        });

        return $query->select(["{$parentTable}.*"])->distinct();
    }

    protected function getSearchableAttributes(): array
    {
        return property_exists($this, 'searchable') ? $this->searchable : [];
    }
}