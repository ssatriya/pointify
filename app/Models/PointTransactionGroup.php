<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PointTransactionGroup extends Model
{
    use HasUlids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_enrollment_id',
        'sequence',
        'is_closed',
        'closed_at',
    ];

    /**
     * Get the studentEnrollment that owns the PointTransactionGroup
     */
    public function studentEnrollment(): BelongsTo
    {
        return $this->belongsTo(StudentEnrollment::class);
    }

    /**
     * Get all the violations for the PointTransactionGroup
     */
    public function violations(): HasMany
    {
        return $this->hasMany(Violation::class);
    }

    /**
     * Get all the rewards for the PointTransactionGroup
     */
    public function rewards(): HasMany
    {
        return $this->hasMany(Reward::class);
    }

    /**
     * Get all the violationLetters for the PointTransactionGroup
     */
    public function violationLetters(): HasMany
    {
        return $this->hasMany(ViolationLetter::class);
    }
}
