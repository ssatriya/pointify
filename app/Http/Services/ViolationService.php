<?php

namespace App\Http\Services;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointThreshold;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use App\Models\ViolationType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ViolationService
{
    /**
     * @throws Throwable
     */
    public function revokeViolation(Violation $violation, array $data): void
    {
        DB::transaction(function () use ($violation, $data) {
            $originalTransaction = PointTransaction::where('violation_id', $violation->id)
                ->where('transaction_type', 'violation')
                ->firstOrFail();

            $actualPointsDeducted = abs($originalTransaction->points_change);
            $studentEnrollmentId = $violation->student_enrollment_id;

            $currentPoints = $violation->studentEnrollment->current_points;

            PointTransaction::create([
                'student_enrollment_id' => $studentEnrollmentId,
                'violation_id' => $violation->id,
                'transaction_type' => TransactionType::REVOKED->value,
                'processed_by' => Auth::id(),
                'description' => "Reversal of incorrect violation: $violation->id",
                'points_change' => $actualPointsDeducted,
                'intended_points' => $currentPoints + $actualPointsDeducted,
                'points_before' => $currentPoints,
                'points_after' => $currentPoints + $actualPointsDeducted,
            ]);

            $currentPoints += $actualPointsDeducted;

            if ($this->violationTriggeredReset($violation)) {
                PointTransaction::create([
                    'student_enrollment_id' => $studentEnrollmentId,
                    'transaction_type' => TransactionType::REVOKED->value,
                    'processed_by' => Auth::id(),
                    'description' => "Reversal of automatic reset triggered by incorrect violation: $violation->id",
                    'points_change' => -100,
                    'intended_points' => $currentPoints - 100,
                    'points_before' => $currentPoints,
                    'points_after' => $currentPoints - 100,
                ]);
            }

            $violation->update([
                'approval_status' => ApprovalStatus::REVOKED->value,
                'revoked_by' => Auth::id(),
                'revoked_at' => now(),
                'revoked_reason' => $data['revoke_reason'],
            ]);

            $this->reopenTransactionGroup($violation);
        });
    }

    /**
     * @throws Throwable
     */
    public function create(array $data, StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($data, $studentEnrollment) {
            $pointThreshold = PointThreshold::exists();

            if (!$pointThreshold) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'point_threshold' => 'Batas poin belum diatur. Silakan atur terlebih dahulu sebelum menambah pelanggaran.',
                ]);
            }

            $violationType = ViolationType::findOrFail($data['violation_type_id']);

            $studentSignature = $data['student_signature'];

            $base64 = preg_replace('/^data:image\/\w+;base64,/', '', $studentSignature);
            $image = base64_decode($base64);

            $fileName = 'signatures/' . uniqid() . '.png';

            Storage::disk('public')->put($fileName, $image);

            $violation = Violation::create([
                'student_enrollment_id' => $studentEnrollment->id,
                'violation_type_id' => $violationType->id,
                'approval_status' => ApprovalStatus::PENDING->value,
                'created_by' => Auth::id(),
                'notes' => $data['notes'] ?? null,
                'student_signature_path' => $fileName,
            ]);

            return $violation->load([
                'violationType',
            ]);
        });
    }

    private function violationTriggeredReset(Violation $violation): bool
    {
        return PointTransaction::where('student_enrollment_id', $violation->student_enrollment_id)
            ->where('transaction_type', 'reset')
            ->where('created_at', '>', $violation->created_at)
            ->exists();
    }

    private function reopenTransactionGroup(Violation $violation): void
    {
        $transactionGroup = PointTransactionGroup::where('student_enrollment_id', $violation->student_enrollment_id)
            ->where('is_closed', true)
            ->orderBy('closed_at', 'desc')
            ->first();

        $transactionGroup?->update([
            'is_closed' => false,
        ]);
    }
}