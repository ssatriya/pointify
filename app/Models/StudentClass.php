<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentClass extends Model
{
    use HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'grade_level',
        'section',
        'slug',
        'order',
        'vocational_program_id',
        'created_by',
        'updated_by',
    ];
    protected array $searchable = [
        'name',
    ];
    protected array $sortable = [
        'created_at',
        'grade_level',
    ];

    /**
     * Get the vocationalProgram that owns the StudentClass
     */
    public function vocationalProgram(): BelongsTo
    {
        return $this->belongsTo(VocationalProgram::class);
    }

}
