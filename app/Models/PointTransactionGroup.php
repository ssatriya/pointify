<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

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
}
