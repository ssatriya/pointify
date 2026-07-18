<?php

declare(strict_types=1);

namespace App\Actions\StudentEnrollment;

use App\Enums\ErrorMessage;
use App\Models\Reward;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

final class DeleteStudentEnrollment
{
    /**
     * @throws ValidationException|Throwable
     */
    public function handle(StudentEnrollment $studentEnrollment)
    {
        DB::transaction(function () use ($studentEnrollment) {
            $violations = Violation::where('student_enrollment_id', $studentEnrollment->id)->exists();
            $rewards = Reward::where('student_enrollment_id', $studentEnrollment->id)->exists();

            if ($violations || $rewards) {
                throw ValidationException::withMessages([
                    'student_enrollment' => ErrorMessage::CONFLICT_DELETE->value,
                ]);
            }

            $studentEnrollment->delete();
        });
    }
}
