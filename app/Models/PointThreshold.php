<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class PointThreshold extends Model
{
    use HasUlids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'academic_year_id',
        'cumulative_points_threshold',
        'description',
        'is_active',
        'created_by',
        'updated_by',
    ];
}
