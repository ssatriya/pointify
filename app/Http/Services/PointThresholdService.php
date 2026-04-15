<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Models\PointThreshold;
use App\Models\PointTransaction;
use App\Models\StudentEnrollment;
use App\Models\ViolationLetter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class PointThresholdService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = PointThreshold::with('academicYear')
            ->select([
                'id',
                'cumulative_points_threshold',
                'academic_year_id',
                'description',
                'is_active',
                'created_at',
            ]);

        return DataTable::make($query, $validated)->process();
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, PointThreshold $pointThreshold): void
    {
        DB::transaction(function () use ($data, $pointThreshold) {
            $pointThreshold->update([...$data, 'updated_by' => Auth::id()]);

            $pointThreshold->fresh();
        });
    }

    public function checkProgressiveThresholds(string $studentEnrollmentId, string $transactionGroupId): void
    {
        $totalPointsUsed = $this->getTotalPointsUsedInGroup($transactionGroupId);

        // Find the maximum threshold points the student HAS already received a letter for in this group
        $highestReceivedThresholdPoints = ViolationLetter::where('student_enrollment_id', $studentEnrollmentId)
            ->where('point_transaction_group_id', $transactionGroupId)
            ->join('point_thresholds', 'violation_letters.point_threshold_id', '=', 'point_thresholds.id')
            ->max('point_thresholds.cumulative_points_threshold') ?? 0;

        // Find the next eligible threshold that is HIGHER than what they already received
        // and LESS THAN OR EQUAL TO their total points used.
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
        // We sum 'intended_points' to capture the actual violation cost, 
        // even if the student didn't have enough points left to deduct the full amount.
        $totalPointsUsed = PointTransaction::whereHas('violation', function ($query) use ($transactionGroupId) {
            $query->where('point_transaction_group_id', $transactionGroupId);
        })
            ->where('transaction_type', 'violation')
            ->sum('intended_points');

        return abs($totalPointsUsed);
    }

    private function triggerPointIfNeeded(
        string         $studentEnrollmentId,
        string         $transactionGroupId,
        PointThreshold $pointThreshold,
        int            $totalPointsUsed
    ): void
    {
        // Only create letter if it doesn't exist (added safety measure)
        $exists = ViolationLetter::where('student_enrollment_id', $studentEnrollmentId)
            ->where('point_transaction_group_id', $transactionGroupId)
            ->where('point_threshold_id', $pointThreshold->id)
            ->exists();

        if (!$exists) {
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

    /**
     * @throws Throwable
     */
    public function create(array $data): void
    {
        DB::transaction(function () use ($data) {
            PointThreshold::create([...$data, 'created_by' => Auth::id()]);
        });
    }
}