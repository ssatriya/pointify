<?php

declare(strict_types=1);

namespace App\Actions\StudentClass;

use App\Models\StudentClass;
use App\Models\VocationalProgram;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Throwable;

final class UpdateStudentClass
{
    /**
     * @throws Throwable|ValidationException
     */
    public function handle(array $data, StudentClass $studentClass): StudentClass
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

        return $studentClass->fresh();
    }

    /**
     * @throws ValidationException
     */
    private function validateUniqueness(array $data, ?StudentClass $studentClass = null): void
    {
        $className = $this->generateClassName($data);
        $query = StudentClass::where('name', $className);

        if ($studentClass?->exists) {
            $query->where('id', '!=', $studentClass->id);
        }

        if ($query->exists()) {
            throw ValidationException::withMessages([
                'grade_level' => 'Data kelas sudah ada di dalam sistem.',
            ]);
        }
    }

    private function generateClassName(array $data): string
    {
        $section = $data['section'] ?? null;
        $vocationalProgram = VocationalProgram::findOrFail($data['vocational_program_id']);

        return trim("{$data['grade_level']} $vocationalProgram->name $section");
    }
}
