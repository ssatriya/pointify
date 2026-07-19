<?php

declare(strict_types=1);

namespace App\Actions\Violation;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\Reward;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use App\Models\ViolationLetter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class RevokeViolation
{
    /**
     * @throws Throwable
     */
    public function handle(Violation $violation, array $data): void
    {
        DB::transaction(function () use ($violation, $data) {
            $violation = Violation::lockForUpdate()->find($violation->id);
            $studentEnrollment = StudentEnrollment::lockForUpdate()->find($violation->student_enrollment_id);
            $studentEnrollment->load('pointTransactions');

            $originalTransaction = PointTransaction::where('violation_id', $violation->id)
                ->where('transaction_type', 'violation')
                ->firstOrFail();

            $actualPointsDeducted = abs($originalTransaction->points_change);
            $currentPoints = $studentEnrollment->currentPoints;
            $willReverseReset = $this->violationTriggeredReset($violation);
            $resetReversalPoints = $willReverseReset ? -$studentEnrollment->initial_points : 0;

            PointTransaction::create([
                'student_enrollment_id' => $studentEnrollment->id,
                'violation_id' => $violation->id,
                'transaction_type' => TransactionType::REVOKED->value,
                'processed_by' => Auth::id(),
                'description' => "Reversal of incorrect violation: $violation->id",
                'points_change' => $actualPointsDeducted,
                'intended_points' => $currentPoints + $actualPointsDeducted,
                'points_before' => $currentPoints,
                'points_after' => $currentPoints + $actualPointsDeducted + $resetReversalPoints,
            ]);

            $currentPoints += $actualPointsDeducted;

            if ($willReverseReset) {
                $initialPoints = $studentEnrollment->initial_points;
                PointTransaction::create([
                    'student_enrollment_id' => $studentEnrollment->id,
                    'transaction_type' => TransactionType::REVOKED->value,
                    'processed_by' => Auth::id(),
                    'description' => "Reversal of automatic reset triggered by incorrect violation: $violation->id",
                    'points_change' => -$initialPoints,
                    'intended_points' => $currentPoints - $initialPoints,
                    'points_before' => $currentPoints,
                    'points_after' => $currentPoints - $initialPoints,
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

    private function violationTriggeredReset(Violation $violation): bool
    {
        return PointTransaction::where('student_enrollment_id', $violation->student_enrollment_id)
            ->where('transaction_type', 'reset')
            ->where('created_at', '>=', $violation->created_at)
            ->exists();
    }

    /**
     * Opens the violation's own transaction group so a replacement violation
     * can be added to the same group and keep the group intact.
     * Any newer open groups are merged into this group to avoid having
     * multiple open groups for the same enrollment.
     */
    private function reopenTransactionGroup(Violation $violation): void
    {
        $transactionGroup = PointTransactionGroup::find($violation->point_transaction_group_id);

        if (! $transactionGroup) {
            return;
        }

        $newerOpenGroups = PointTransactionGroup::where('student_enrollment_id', $violation->student_enrollment_id)
            ->where('is_closed', false)
            ->where('sequence', '>', $transactionGroup->sequence)
            ->get();

        foreach ($newerOpenGroups as $newerGroup) {
            Violation::where('point_transaction_group_id', $newerGroup->id)
                ->update(['point_transaction_group_id' => $transactionGroup->id]);

            Reward::where('point_transaction_group_id', $newerGroup->id)
                ->update(['point_transaction_group_id' => $transactionGroup->id]);

            ViolationLetter::where('point_transaction_group_id', $newerGroup->id)
                ->update(['point_transaction_group_id' => $transactionGroup->id]);

            $newerGroup->delete();
        }

        $transactionGroup->update([
            'is_closed' => false,
        ]);
    }
}
