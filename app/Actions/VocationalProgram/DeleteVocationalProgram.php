<?php

declare(strict_types=1);

namespace App\Actions\VocationalProgram;

use App\Models\Student;
use App\Models\StudentClass;
use App\Models\VocationalProgram;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

final class DeleteVocationalProgram
{
    /**
     * @throws Throwable
     */
    public function handle(VocationalProgram $vocationalProgram)
    {
        DB::transaction(function () use ($vocationalProgram) {
            $hasStudents = Student::where('vocational_program_id', $vocationalProgram->id)->exists();
            $hasClasses = StudentClass::where('vocational_program_id', $vocationalProgram->id)->exists();

            if ($hasStudents || $hasClasses) {
                throw ValidationException::withMessages([
                    'vocational_program' => 'Program kejuruan tidak bisa dihapus karena masih digunakan oleh data siswa atau kelas.',
                ]);
            }

            $vocationalProgram->delete();
        });
    }
}
