<?php

declare(strict_types=1);

namespace App\Actions\AcademicYear;

use App\Models\AcademicYear;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class DeleteAcademicYear
{
    /**
     * @throws ValidationException
     */
    public function handle(AcademicYear $academicYear): void
    {
        DB::transaction(function () use ($academicYear) {
            if ($academicYear->is_active) {
                throw ValidationException::withMessages([
                    'academic_year' => 'Tahun akademik aktif tidak bisa dihapus.',
                ]);
            }

            $academicYear->delete();
        });
    }
}
