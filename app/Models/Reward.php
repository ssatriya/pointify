<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reward extends Model
{
    use HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'point_transaction_group_id',
        'student_enrollment_id',
        'approved_by',
        'approval_status',
        'approved_at',
        'reward_type_id',
        'created_by',
        'revoked_by',
        'revoked_at',
        'revoked_reason',
        'notes',
    ];

    protected array $searchable = [
        'studentEnrollment.student.name',
    ];

    protected array $sortable = [
        'created_at',
    ];

    /**
     * Get the studentEnrollment that owns the Reward
     */
    public function studentEnrollment(): BelongsTo
    {
        return $this->belongsTo(StudentEnrollment::class);
    }

    /**
     * Get the rewardType that owns the Reward
     */
    public function rewardType(): BelongsTo
    {
        return $this->belongsTo(RewardType::class);
    }

    /**
     * Get the createdBy that owns the Reward
     */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the pointTransaction associated with the Reward
     */
    public function pointTransaction(): HasOne
    {
        return $this->hasOne(PointTransaction::class);
    }

    /**
     * Get the transactionGroup that owns the Reward
     */
    public function transactionGroup(): BelongsTo
    {
        return $this->belongsTo(PointTransactionGroup::class, 'point_transaction_group_id');
    }
}
