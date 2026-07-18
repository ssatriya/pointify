<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\DataTable;
use App\Models\Student;
use Illuminate\Pagination\LengthAwarePaginator;

final class StudentList
{
    public function handle(array $validated): LengthAwarePaginator
    {
        $query = Student::with('vocationalProgram:id,name')
            ->join('vocational_programs', 'students.vocational_program_id', '=', 'vocational_programs.id');

        $dataTable = DataTable::make($query, $validated);

        $dataTable->search();

        $query->addSelect([
            'students.id',
            'students.name',
            'students.student_number',
            'students.vocational_program_id',
            'students.created_at',
            'students.is_active',
            'vocational_programs.name as vocational_program_name',
        ]);

        return $dataTable->filter()
            ->getQuery()
            ->orderBy('vocational_program_name', 'asc')
            ->orderBy('students.name', 'asc')
            ->paginate($validated['per_page'] ?? 15)
            ->withQueryString();
    }
}
