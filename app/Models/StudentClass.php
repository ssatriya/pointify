<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    use HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'grade_level',
        'section',
        'slug',
        'order',
        'vocational_program_id',
        'created_by',
        'updated_by',
    ];

    protected array $searchable = [
        'name',
    ];

    protected array $sortable = [
        'created_at',
        'grade_level',
    ];
}
