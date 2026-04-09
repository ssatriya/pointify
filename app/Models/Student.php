<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory, HasUlids, Sortable, Searchable, Filterable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_number',
        'name',
        'vocational_program_id',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected array $searchable = [
        'name',
        'student_number'
    ];

    protected array $sortable = [
        'name',
        'created_at',
    ];

    protected array $filterable = [
        'filter' => [
            'column' => 'students.vocational_program_id',
            'type' => 'in'
        ]
    ];


    /**
     * Get the vocationalProgram that owns the Student
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vocationalProgram(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(VocationalProgram::class);
    }

    /**
     * Get all the studentEnrollments for the Student
     */
    public function studentEnrollments(): HasMany
    {
        return $this->hasMany(StudentEnrollment::class);
    }
}
