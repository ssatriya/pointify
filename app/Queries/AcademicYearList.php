<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\DataTable;
use App\Models\AcademicYear;
use Illuminate\Pagination\LengthAwarePaginator;

final class AcademicYearList
{
    public function handle(array $validated): LengthAwarePaginator
    {
        $query = AcademicYear::query();

        return DataTable::make($query, $validated)->process();
    }
}
