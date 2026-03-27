<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Violation extends Model
{
    use HasUlids, Sortable, Searchable, Filterable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'point_transaction_group_id',
        'student_enrollment_id',
        'violation_type_id',

        'approval_status',
        'approved_by',
        'approved_at',

        'rejection_reason',

        'revoked_by',
        'revoked_at',
        'revoked_reason',

        'created_by',
        'student_signature_path',
        'notes',
    ];
    protected array $searchable = [
        'studentEnrollment.student.name',
    ];
    protected array $sortable = [
        'created_at',
    ];
    protected array $filterable = [
        'status' => [
            'column' => 'approval_status',
            'type' => 'in'
        ]
    ];

    /**
     * Get the transactionGroup that owns the Violation
     */
    public function transactionGroup(): BelongsTo
    {
        return $this->belongsTo(PointTransactionGroup::class);
    }

    /**
     * Get the studentEnrollment that owns the Violation
     */
    public function studentEnrollment(): BelongsTo
    {
        return $this->belongsTo(StudentEnrollment::class);
    }

    /**
     * Get the violationType that owns the Violation
     */
    public function violationType(): BelongsTo
    {
        return $this->belongsTo(ViolationType::class);
    }

    /**
     * Get the createdBy that owns the Violation
     */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the pointTransaction associated with the Violation
     */
    public function pointTransaction(): HasOne
    {
        return $this->hasOne(PointTransaction::class);
    }

}
