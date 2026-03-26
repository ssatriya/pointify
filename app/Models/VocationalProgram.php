<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class VocationalProgram extends Model
{
    use HasUlids, Sortable, Searchable;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'abbreviation',
        'created_by',
        'updated_by',
    ];
    protected array $searchable = [
        'name',
        'abbreviation'
    ];
    protected array $sortable = [
        'created_at',
    ];
}
