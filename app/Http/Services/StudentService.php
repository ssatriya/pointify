<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Models\Student;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\StudentImport;
use Throwable;

class StudentService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = Student::with('vocationalProgram:id,name')
            ->join('vocational_programs', 'students.vocational_program_id', '=', 'vocational_programs.id');

        $dataTable = DataTable::make($query, $validated);

        // Apply search first (this may add select('students.*') and distinct())
        $dataTable->search();

        // Ensure all required columns are in the select list for PostgreSQL DISTINCT ORDER BY requirement
        $query->addSelect([
            'students.id',
            'students.name',
            'students.student_number',
            'students.vocational_program_id',
            'students.created_at',
            'students.is_active',
            'vocational_programs.name as vocational_program_name',
        ]);

        // Apply filter and custom grouping order
        return $dataTable->filter()
            ->getQuery()
            ->orderBy('vocational_program_name', 'asc')
            ->orderBy('students.name', 'asc')
            ->paginate($validated['per_page'] ?? 15);
    }

    /**
     * @throws Throwable
     */
    public function create(array $data): void
    {
        DB::transaction(function () use ($data) {
            $student = Student::create([...$data, 'created_by' => Auth::id()]);

            $student->load(['vocationalProgram:id,name']);
        });
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, Student $student): void
    {
        DB::transaction(function () use ($data, $student) {
            $student->update([...$data, 'updated_by' => Auth::id()]);

            $student->fresh();
        });
    }

    /**
     * @throws Throwable
     */
    public function import(UploadedFile $file): void
    {
        DB::transaction(function () use ($file) {
            Excel::import(new StudentImport, $file);
        });
    }

    /**
     * @throws Throwable
     */
    public function delete(Student $student): void
    {
        DB::transaction(function () use ($student) {
            $student->delete();
        });
    }
}