<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ViolationLetter extends Model
{
    use HasUlids, HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_enrollment_id',
        'point_transaction_group_id',
        'point_threshold_id',
        'cumulative_points_when_sent',
        'current_remaining_points',
    ];

    /**
     * Get the transactionGroup that owns the ViolationLetter
     */
    public function transactionGroup(): BelongsTo
    {
        return $this->belongsTo(PointTransactionGroup::class, 'point_transaction_group_id');
    }

    /**
     * Get the studentEnrollment that owns the ViolationLetter
     */
    public function studentEnrollment(): BelongsTo
    {
        return $this->belongsTo(StudentEnrollment::class);
    }
}
