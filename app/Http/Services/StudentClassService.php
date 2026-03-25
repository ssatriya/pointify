<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Models\StudentClass;
use App\Models\VocationalProgram;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class StudentClassService
{
    public function index(array $validated): LengthAwarePaginator
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

        return DataTable::make($query, $validated)->process();
    }

    /**
     * @throws Throwable
     */
    public function create(array $data): void
    {
        $this->validateUniqueness($data);

        DB::transaction(function () use ($data) {
            $className = $this->generateClassName($data);

            StudentClass::create([
                ...$data,
                'name' => $className,
                'slug' => Str::slug($className),
                'order' => $this->getNextOrder(),
                'created_by' => Auth::id(),
            ]);
        });
    }

    /**
     * @throws Exception
     */
    private function validateUniqueness(array $data, ?StudentClass $studentClass = null): void
    {
        $className = $this->generateClassName($data);
        $query = StudentClass::where('name', $className);

        if ($studentClass?->exists) {
            $query->where('id', '!=', $studentClass->id);
        }

        if ($query->exists()) {
            throw new Exception('Data kelas sudah ada di dalam sistem.');
        }
    }

    private function generateClassName(array $data): string
    {
        $section = $data['section'] ?? null;
        $vocationalProgram = VocationalProgram::findOrFail($data['vocational_program_id']);

        return trim("{$data['grade_level']} $vocationalProgram->name $section");
    }

    private function getNextOrder(): int
    {
        return (StudentClass::max('order') ?? 0) + 1;
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, StudentClass $studentClass): void
    {
        $this->validateUniqueness($data, $studentClass);

        DB::transaction(function () use ($data, $studentClass) {
            $className = $this->generateClassName($data);

            $studentClass->update([
                ...$data,
                'name' => $className,
                'slug' => Str::slug($className),
                'updated_by' => Auth::id(),
            ]);
        });
    }

    /**
     * @throws Throwable
     */
    public function delete(StudentClass $studentClass): void
    {
        DB::transaction(function () use ($studentClass) {
            $studentClass->delete();
        });
    }
}