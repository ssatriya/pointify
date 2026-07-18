<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\DataTable;
use App\Models\VocationalProgram;
use Illuminate\Pagination\LengthAwarePaginator;

final class VocationalProgramList
{
    public function handle(array $validated): LengthAwarePaginator
    {
        $query = VocationalProgram::query()->orderBy('created_at', 'desc');

        return DataTable::make($query, $validated)->process();
    }
}
