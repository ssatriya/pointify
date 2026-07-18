<?php

declare(strict_types=1);

namespace App\Actions\PointThreshold;

use App\Models\PointThreshold;
use App\Models\PointTransaction;
use App\Models\StudentEnrollment;
use App\Models\ViolationLetter;

final class CheckProgressiveThreshold
{
    public function handle(string $studentEnrollmentId, string $transactionGroupId): void
    {
        $totalPointsUsed = $this->getTotalPointsUsedInGroup($transactionGroupId);

        $highestReceivedThresholdPoints = ViolationLetter::where('student_enrollment_id', $studentEnrollmentId)
            ->where('point_transaction_group_id', $transactionGroupId)
            ->join('point_thresholds', 'violation_letters.point_threshold_id', '=', 'point_thresholds.id')
            ->max('point_thresholds.cumulative_points_threshold') ?? 0;

        $nextPointThreshold = PointThreshold::where('is_active', true)
            ->where('cumulative_points_threshold', '<=', $totalPointsUsed)
            ->where('cumulative_points_threshold', '>', $highestReceivedThresholdPoints)
            ->orderBy('cumulative_points_threshold', 'desc')
            ->first();

        if ($nextPointThreshold) {
            $this->triggerPointIfNeeded($studentEnrollmentId, $transactionGroupId, $nextPointThreshold, $totalPointsUsed);
        }
    }

    private function getTotalPointsUsedInGroup(string $transactionGroupId): int
    {
        $totalPointsUsed = PointTransaction::whereHas('violation', function ($query) use ($transactionGroupId) {
            $query->where('point_transaction_group_id', $transactionGroupId);
        })
            ->where('transaction_type', 'violation')
            ->sum('intended_points');

        return abs($totalPointsUsed);
    }

    private function triggerPointIfNeeded(
        string $studentEnrollmentId,
        string $transactionGroupId,
        PointThreshold $pointThreshold,
        int $totalPointsUsed
    ): void {
        $exists = ViolationLetter::where('student_enrollment_id', $studentEnrollmentId)
            ->where('point_transaction_group_id', $transactionGroupId)
            ->where('point_threshold_id', $pointThreshold->id)
            ->exists();

        if (! $exists) {
            $currentPoints = $this->getCurrentPoints($studentEnrollmentId);

            ViolationLetter::create([
                'student_enrollment_id' => $studentEnrollmentId,
                'point_transaction_group_id' => $transactionGroupId,
                'point_threshold_id' => $pointThreshold->id,
                'cumulative_points_when_sent' => $totalPointsUsed,
                'current_remaining_points' => $currentPoints,
            ]);
        }
    }

    private function getCurrentPoints(string $studentEnrollmentId): int
    {
        $enrollment = StudentEnrollment::with('pointTransactions')->find($studentEnrollmentId);

        return $enrollment->current_points;
    }
}
