<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

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
}
