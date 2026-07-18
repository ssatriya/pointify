<?php

declare(strict_types=1);

namespace App\Actions\StudentEnrollment;

use App\Models\StudentEnrollment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class CreateStudentEnrollment
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, string $studentClassId)
    {
        return DB::transaction(function () use ($data, $studentClassId) {
            $studentEnrollments = [];

            foreach ($data['student_id'] as $studentId) {
                $studentEnrollment = StudentEnrollment::create([
                    'student_id' => $studentId,
                    'academic_year_id' => $data['academic_year_id'],
                    'is_active' => $data['is_active'],
                    'is_repeating' => $data['is_repeating'],
                    'student_class_id' => $studentClassId,
                    'created_by' => Auth::id(),
                ]);

                $studentEnrollments[] = $studentEnrollment;
            }

            $enrollmentIds = collect($studentEnrollments)->pluck('id');

            return StudentEnrollment::with([
                'student:id,name',
                'studentClass:id,name',
                'academicYear:id,name',
                'pointTransactions:id,student_enrollment_id,transaction_type,points_change',
            ])->whereIn('id', $enrollmentIds)->get();
        });
    }
}
