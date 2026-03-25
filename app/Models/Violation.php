<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

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

}
