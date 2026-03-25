<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory, HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'student_number',
        'name',
        'vocational_program_id',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected array $searchable = [
        'name',
        'vocationalProgram.name',
    ];

    protected array $sortable = [
        'name',
        'created_at',
    ];
}
