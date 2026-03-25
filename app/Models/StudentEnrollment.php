<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class StudentEnrollment extends Model
{
    use HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_id',
        'student_class_id',
        'academic_year_id',
        'initial_points',
        'is_repeating',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected array $searchable = [
        'student.name',
    ];

    protected array $sortable = [
        'created_at',
        'student.name',
    ];

}
