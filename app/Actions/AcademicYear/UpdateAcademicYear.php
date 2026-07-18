<?php

declare(strict_types=1);

namespace App\Actions\AcademicYear;

use App\Models\AcademicYear;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class UpdateAcademicYear
{
    /**
     * @throws ValidationException
     */
    public function handle(array $data, AcademicYear $academicYear): AcademicYear
    {
        DB::transaction(function () use ($data, $academicYear) {
            $startYear = Carbon::parse($data['start_date'])->format('Y');
            $endYear = Carbon::parse($data['end_date'])->format('Y');
            $academicYearName = "$startYear/$endYear";

            $isAcademicYearExists = AcademicYear::where('name', $academicYearName)
                ->where('id', '!=', $academicYear->id)
                ->exists();

            if ($isAcademicYearExists) {
                throw ValidationException::withMessages([
                    'academic_year' => 'Kombinasi tahun akademik sudah digunakan.',
                ]);
            }

            if ($data['is_active']) {
                AcademicYear::where('id', '!=', $academicYear->id)
                    ->where('is_active', true)
                    ->update(['is_active' => false]);
            }

            $academicYear->update([
                ...$data,
                'name' => $academicYearName,
                'updated_by' => Auth::id(),
            ]);
        });

        return $academicYear->fresh();
    }
}
