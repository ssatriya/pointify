<?php

namespace App\Http\Services;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use Illuminate\Support\Facades\Auth;

class ViolationApprovalService
{
    public function update(array $data, Violation $violation): void
    {
        $approvalStatus = $data['status'];

        if ($approvalStatus === ApprovalStatus::APPROVED->value) {
            $violation = Violation::lockForUpdate()->find($violation->id);
            if ($violation->approval_status === ApprovalStatus::APPROVED->value) {
                return;
            }
            $studentEnrollment = $violation->studentEnrollment;
            $currentPoints = $violation->studentEnrollment->currentPoints;

            $violationPoints = $violation->violationType->points;
            $actualDeducted = min($currentPoints, $violationPoints);
            $newPoints = $currentPoints - $actualDeducted;

            $lastSequence = PointTransactionGroup::where('student_enrollment_id', $studentEnrollment->id)->max('sequence') ?? 0;

            $transactionGroup = PointTransactionGroup::firstOrCreate(
                [
                    'student_enrollment_id' => $studentEnrollment->id,
                    'is_closed' => false,
                ],
                [
                    'sequence' => $lastSequence + 1
                ]
            );

            $violation->update([
                'point_transaction_group_id' => $transactionGroup->id,
                'approval_status' => ApprovalStatus::APPROVED->value,
                'approved_by' => Auth::id(),
                'approved_at' => now()
            ]);

            $violation->pointTransaction()->create([
                'student_enrollment_id' => $studentEnrollment->id,
                'transaction_type' => TransactionType::VIOLATION->value,
                'processed_by' => Auth::id(),
                'points_change' => -$actualDeducted,
                'intended_points' => -$violationPoints,
                'points_before' => $currentPoints,
                'points_after' => $newPoints
            ]);

            $pointThresholdService = new PointThresholdService;
            $pointThresholdService->checkProgressiveThresholds(
                $studentEnrollment->id,
                $transactionGroup->id
            );

            $willTriggerReset = $newPoints <= 0;

            if ($willTriggerReset) {
                $this->processPointReset($studentEnrollment, $newPoints);
            }
        } else if ($approvalStatus === ApprovalStatus::REJECTED->value) {
            $violation->update([
                'approval_status' => ApprovalStatus::REJECTED->value,
                'approved_by' => Auth::id(),
                'approved_at' => now(),
                'rejection_reason' => $data['rejection_reason'] ?? null,
            ]);
        }
    }

    private function processPointReset(StudentEnrollment $studentEnrollment, int $currentBalance): void
    {
        $pointsToAdd = $studentEnrollment->initial_points;

        PointTransaction::create([
            'student_enrollment_id' => $studentEnrollment->id,
            'transaction_type' => TransactionType::RESET->value,
            'processed_by' => Auth::id(),
            'points_change' => $pointsToAdd,
            'points_before' => $currentBalance,
            'points_after' => $pointsToAdd,
        ]);

        $transactionGroup = PointTransactionGroup::where('student_enrollment_id', $studentEnrollment->id)
            ->where('is_closed', false)->firstOrFail();

        $transactionGroup->update([
            'is_closed' => true,
            'closed_at' => now(),
        ]);
    }
}