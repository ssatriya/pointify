<?php

declare(strict_types=1);

namespace App\Actions\Violation;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\Violation;
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

            PointTransaction::create([
                'student_enrollment_id' => $studentEnrollment->id,
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
