<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PointTransaction extends Model
{
    use HasUlids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_enrollment_id',
        'transaction_type',
        'violation_id',
        'reward_id',
        'processed_by',
        'description',
        'points_change',
        'intended_points',
        'points_before',
        'points_after',
    ];
    protected $casts = [
        'points_change' => 'integer',
        'intended_points' => 'integer',
        'points_before' => 'integer',
        'points_after' => 'integer',
    ];


    /**
     * Get the studentEnrollment that owns the PointTransaction
     */
    public function studentEnrollment(): BelongsTo
    {
        return $this->belongsTo(StudentEnrollment::class);
    }

    /**
     * Get the processedBy that owns the PointTransaction
     */
    public function processedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    /**
     * Get the violation that owns the PointTransaction
     */
    public function violation(): BelongsTo
    {
        return $this->belongsTo(Violation::class);
    }

    /**
     * Get the reward that owns the PointTransaction
     */
    public function reward(): BelongsTo
    {
        return $this->belongsTo(Reward::class);
    }

    // public function scopeForEnrollment($query, $enrollmentId)
    // {
    //     return $query->where('student_enrollment_id', $enrollmentId);
    // }

    // public function scopeViolations($query)
    // {
    //     return $query->where('type', 'violation');
    // }

    // public function scopeRewards($query)
    // {
    //     return $query->where('type', 'reward');
    // }

    // public function scopeReset($query)
    // {
    //     return $query->where('type', 'reset');
    // }

    // public function scopeRecentFirst($query)
    // {
    //     return $query->orderBy('created_at', 'desc');
    // }
}
