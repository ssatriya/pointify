<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    use HasUlids, Sortable, Searchable, HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_active',
        'created_by',
        'updated_by',
    ];
    protected array $searchable = [
        'name',
    ];
    protected array $sortable = [
        'created_at',
    ];
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Get the formatted label for selects
     */
    public function getLabelAttribute(): string
    {
        return $this->name;
    }
}
