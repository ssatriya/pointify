<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Models\Student;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class StudentService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = Student::with('vocationalProgram:id,name')
            ->select([
                'id',
                'name',
                'student_number',
                'vocational_program_id',
                'created_at',
                'is_active',
            ]);

        return DataTable::make($query, $validated)->process();
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
    public function delete(Student $student): void
    {
        DB::transaction(function () use ($student) {
            $student->delete();
        });
    }
}