<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\DataTable;
use App\Models\PointThreshold;
use Illuminate\Pagination\LengthAwarePaginator;

final class PointThresholdList
{
    public function handle(array $validated): LengthAwarePaginator
    {
        $query = PointThreshold::with('academicYear')
            ->select([
                'id',
                'cumulative_points_threshold',
                'academic_year_id',
                'description',
                'is_active',
                'created_at',
            ]);

        return DataTable::make($query, $validated)->process();
    }
}
