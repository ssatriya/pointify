<?php

namespace App\Http\Services;

use App\Enums\ErrorMessage;
use App\Models\Reward;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Throwable;

class StudentEnrollmentService
{
    /**
     * @throws Throwable
     */
    public function create(array $data, string $studentClassId)
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

    /**
     * @throws Throwable
     */
    public function update(array $data, StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($data, $studentEnrollment) {
            $studentEnrollment->update([...$data, 'updated_by' => Auth::id()]);

            return $studentEnrollment->fresh()->load([
                'student:id,name',
                'studentClass:id,name',
                'academicYear:id,name',
            ]);
        });
    }

    /** @throws ConflictHttpException|Throwable */
    public function delete(StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($studentEnrollment) {
            $violations = Violation::where('student_enrollment_id', $studentEnrollment->id)->exists();
            $rewards = Reward::where('student_enrollment_id', $studentEnrollment->id)->exists();

            if ($violations || $rewards) {
                throw new ConflictHttpException(ErrorMessage::CONFLICT_DELETE->value);
            }

            $studentEnrollment->delete();
        });
    }
}