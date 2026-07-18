<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\DataTable;
use App\Models\ViolationType;
use Illuminate\Pagination\LengthAwarePaginator;

final class ViolationTypeList
{
    public function handle(array $validated): LengthAwarePaginator
    {
        $query = ViolationType::query()
            ->select([
                'id',
                'code',
                'description',
                'points',
                'is_active',
                'created_at',
            ]);

        return DataTable::make($query, $validated)->process();
    }
}
