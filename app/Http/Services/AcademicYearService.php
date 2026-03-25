<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Models\AcademicYear;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Throwable;

class AcademicYearService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = AcademicYear::query();

        return DataTable::make($query, $validated)->process();
    }

    /**
     * Create a new academic year, if it is a first make is_current true.
     * If it is not first and is_current set to true,
     * make other is_current to false
     * @throws ConflictHttpException|Throwable
     */
    public function create(array $data): void
    {
        DB::transaction(function () use ($data) {
            $isActive = $data['is_active'];
            $startYear = explode('-', $data['start_date'])[0];
            $endYear = explode('-', $data['end_date'])[0];
            $academicYearName = "$startYear/$endYear";

            $isAcademicYearExists = AcademicYear::where('name', "$academicYearName")->exists();

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
                'created_by' => Auth::id()
            ]);

            if (!$isActive && !AcademicYear::where('is_active', true)->exists()) {
                $academicYear->update(['is_active' => true]);
            }
        });
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, AcademicYear $academicYear): void
    {
        DB::transaction(function () use ($data, $academicYear) {
            $startYear = explode('-', $data['start_date'])[0];
            $endYear = explode('-', $data['end_date'])[0];
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
                'updated_by' => Auth::id()
            ]);
        });
    }

    /** @throws ConflictHttpException|Throwable */
    public function delete(AcademicYear $academicYear): void
    {
        DB::transaction(function () use ($academicYear) {
            if ($academicYear->is_active) {
                throw new ConflictHttpException('Tahun akademik aktif tidak bisa dihapus.');
            }

            $academicYear->delete();
        });
    }
}