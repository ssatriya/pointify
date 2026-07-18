<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\DataTable;
use App\Models\StudentClass;
use Illuminate\Pagination\LengthAwarePaginator;

final class StudentClassList
{
    public function handle(array $validated): LengthAwarePaginator
    {
        $query = StudentClass::with(['vocationalProgram:id,name'])
            ->select([
                'id',
                'name',
                'grade_level',
                'section',
                'vocational_program_id',
                'created_at',
            ]);

        return DataTable::make($query, $validated)
            ->search($validated['search'])
            ->order('order')
            ->paginate(50);
    }
}
