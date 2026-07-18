<?php

declare(strict_types=1);

namespace App\Actions\Violation;

use App\Enums\ApprovalStatus;
use App\Models\PointThreshold;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use App\Models\ViolationType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

final class CreateViolation
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($data, $studentEnrollment) {
            $pointThreshold = PointThreshold::exists();

            if (! $pointThreshold) {
                throw ValidationException::withMessages([
                    'point_threshold' => 'Batas poin belum diatur. Silakan atur terlebih dahulu sebelum menambah pelanggaran.',
                ]);
            }

            $violationType = ViolationType::findOrFail($data['violation_type_id']);

            $violation = Violation::create([
                'student_enrollment_id' => $studentEnrollment->id,
                'violation_type_id' => $violationType->id,
                'approval_status' => ApprovalStatus::PENDING->value,
                'created_by' => Auth::id(),
                'notes' => $data['notes'] ?? null,
            ]);

            return $violation->load([
                'violationType',
            ]);
        });
    }
}
