<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class ViolationType extends Model
{
    use HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'code',
        'description',
        'points',
        'is_active',
        'created_by',
        'updated_by',
    ];
    protected array $searchable = [
        'code',
        'description',
    ];
    protected array $sortable = [
        'code',
        'points',
        'created_at',
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the description as name for select options
     */
    public function getNameAttribute(): string
    {
        return $this->description;
    }

    /**
     * Get the formatted label for selects
     */
    public function getLabelAttribute(): string
    {
        return "[{$this->code}] {$this->description} - {$this->points} poin";
    }

}
