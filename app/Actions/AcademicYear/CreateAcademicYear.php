<?php

declare(strict_types=1);

namespace App\Actions\AcademicYear;

use App\Models\AcademicYear;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class CreateAcademicYear
{
    /**
     * Create a new academic year, if it is a first make is_current true.
     * If it is not first and is_current set to true,
     * make other is_current to false.
     *
     * @throws ValidationException
     */
    public function handle(array $data): AcademicYear
    {
        return DB::transaction(function () use ($data) {
            $isActive = $data['is_active'];
            $startYear = Carbon::parse($data['start_date'])->format('Y');
            $endYear = Carbon::parse($data['end_date'])->format('Y');
            $academicYearName = "$startYear/$endYear";

            $isAcademicYearExists = AcademicYear::where('name', $academicYearName)->exists();

            if ($isAcademicYearExists) {
                throw ValidationException::withMessages([
                    'academic_year' => 'Kombinasi tahun akademik sudah digunakan.',
                ]);
            }

            if ($isActive) {
                AcademicYear::where('is_active', true)->update(['is_active' => false]);
            }

            $academicYear = AcademicYear::create([
                ...$data,
                'name' => $academicYearName,
                'created_by' => Auth::id(),
            ]);

            if (! $isActive && ! AcademicYear::where('is_active', true)->exists()) {
                $academicYear->update(['is_active' => true]);
            }

            return $academicYear;
        });
    }
}
