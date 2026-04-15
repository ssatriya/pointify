<?php

namespace App\Http\Services;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use DB;

class ViolationApprovalService
{
    public function __construct(
        private PointThresholdService $pointThresholdService
    ) {
    }

    public function update(array $data, Violation $violation, string $processorId): void
    {
        $approvalStatus = $data['status'];

        DB::transaction(function () use ($data, $violation, $approvalStatus, $processorId) {

            $violation = Violation::lockForUpdate()->find($violation->id);

            if ($violation->approval_status === ApprovalStatus::APPROVED->value) {
                return;
            }

            if ($approvalStatus === ApprovalStatus::APPROVED->value) {
                $studentEnrollment = StudentEnrollment::lockForUpdate()->find($violation->student_enrollment_id);
                $studentEnrollment->load('pointTransactions');

                $currentPoints = $studentEnrollment->currentPoints;
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
                    'approved_by' => $processorId,
                    'approved_at' => now()
                ]);
                $violation->pointTransaction()->create([
                    'student_enrollment_id' => $studentEnrollment->id,
                    'transaction_type' => TransactionType::VIOLATION->value,
                    'processed_by' => $processorId,
                    'points_change' => -$actualDeducted,
                    'intended_points' => -$violationPoints,
                    'points_before' => $currentPoints,
                    'points_after' => $newPoints
                ]);
                // Call injected service
                $this->pointThresholdService->checkProgressiveThresholds(
                    $studentEnrollment->id,
                    $transactionGroup->id
                );
                $willTriggerReset = $newPoints <= 0;
                if ($willTriggerReset) {
                    $this->processPointReset($studentEnrollment, $newPoints, $processorId);
                }
            } else if ($approvalStatus === ApprovalStatus::REJECTED->value) {
                $violation->update([
                    'approval_status' => ApprovalStatus::REJECTED->value,
                    'approved_by' => $processorId,
                    'approved_at' => now(),
                    'rejection_reason' => $data['rejection_reason'] ?? null,
                ]);
            }
        });

        // $violation = Violation::lockForUpdate()->find($violation->id);

        //     if ($approvalStatus === ApprovalStatus::APPROVED->value) {
        //         if ($violation->approval_status === ApprovalStatus::APPROVED->value) {
        //             return;
        //         }
        //         $studentEnrollment = $violation->studentEnrollment;
        //         $currentPoints = $violation->studentEnrollment->currentPoints;

        //         $violationPoints = $violation->violationType->points;
        //         $actualDeducted = min($currentPoints, $violationPoints);
        //         $newPoints = $currentPoints - $actualDeducted;

        //         $lastSequence = PointTransactionGroup::where('student_enrollment_id', $studentEnrollment->id)->max('sequence') ?? 0;

        //         $transactionGroup = PointTransactionGroup::firstOrCreate(
        //             [
        //                 'student_enrollment_id' => $studentEnrollment->id,
        //                 'is_closed' => false,
        //             ],
        //             [
        //                 'sequence' => $lastSequence + 1
        //             ]
        //         );

        //         $violation->update([
        //             'point_transaction_group_id' => $transactionGroup->id,
        //             'approval_status' => ApprovalStatus::APPROVED->value,
        //             'approved_by' => Auth::id(),
        //             'approved_at' => now()
        //         ]);

        //         $violation->pointTransaction()->create([
        //             'student_enrollment_id' => $studentEnrollment->id,
        //             'transaction_type' => TransactionType::VIOLATION->value,
        //             'processed_by' => Auth::id(),
        //             'points_change' => -$actualDeducted,
        //             'intended_points' => -$violationPoints,
        //             'points_before' => $currentPoints,
        //             'points_after' => $newPoints
        //         ]);

        //         $pointThresholdService = new PointThresholdService;
        //         $pointThresholdService->checkProgressiveThresholds(
        //             $studentEnrollment->id,
        //             $transactionGroup->id
        //         );

        //         $willTriggerReset = $newPoints <= 0;

        //         if ($willTriggerReset) {
        //             $this->processPointReset($studentEnrollment, $newPoints);
        //         }
        //     } else if ($approvalStatus === ApprovalStatus::REJECTED->value) {
        //         $violation->update([
        //             'approval_status' => ApprovalStatus::REJECTED->value,
        //             'approved_by' => Auth::id(),
        //             'approved_at' => now(),
        //             'rejection_reason' => $data['rejection_reason'] ?? null,
        //         ]);
        //     }

    }

    private function processPointReset(StudentEnrollment $studentEnrollment, int $currentBalance, int|string $processorId): void
    {
        $pointsToAdd = $studentEnrollment->initial_points;
        PointTransaction::create([
            'student_enrollment_id' => $studentEnrollment->id,
            'transaction_type' => TransactionType::RESET->value,
            'processed_by' => $processorId,
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