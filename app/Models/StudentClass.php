<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'order',
    ];

    /**
     * Get the vocationalProgram that owns the StudentClass
     */
    public function vocationalProgram(): BelongsTo
    {
        return $this->belongsTo(VocationalProgram::class);
    }

    /**
     * Get all the studentEnrollments for the StudentClass
     */
    public function studentEnrollments(): HasMany
    {
        return $this->hasMany(StudentEnrollment::class);
    }

    /**
     * Get the abbreviation's name from vocational program
     * combine with student class data
     */
    protected function abbreviation(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->relationLoaded('vocationalProgram') || !$this->vocationalProgram?->abbreviation) {
                    return null;
                }

                return trim("$this->grade_level {$this->vocationalProgram->abbreviation} $this->section");
            }
        );
    }
}
