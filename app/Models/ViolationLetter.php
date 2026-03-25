<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class ViolationLetter extends Model
{
    use HasUlids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_enrollment_id',
        'point_transaction_group_id',
        'point_threshold_id',
        'cumulative_points_when_sent',
        'current_remaining_points',
    ];
}
