<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

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
}
