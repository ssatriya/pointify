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

        $violationLetter = ViolationLetter::where('student_enrollment_id', $studentEnrollmentId)
            ->where('point_transaction_group_id', $transactionGroupId)
            ->pluck('point_threshold_id')
            ->toArray();

        $nextPointThreshold = PointThreshold::where('is_active', true)
            ->where('cumulative_points_threshold', '<=', $totalPointsUsed)
            ->whereNotIn('id', $violationLetter)
            ->orderBy('cumulative_points_threshold', 'desc')
            ->first();

        if ($nextPointThreshold) {
            $this->triggerPointIfNeeded($studentEnrollmentId, $transactionGroupId, $nextPointThreshold, $totalPointsUsed);
        }
    }

    private function getTotalPointsUsedInGroup($transactionGroupId): int
    {
        $totalPointsUsed = PointTransaction::whereHas('violation', function ($query) use ($transactionGroupId) {
            $query->where('point_transaction_group_id', $transactionGroupId);
        })
            ->where('transaction_type', 'violation')
            ->where('points_change', '<', 0)
            ->sum('points_change');

        return abs($totalPointsUsed);
    }

    private function triggerPointIfNeeded(
        string         $studentEnrollmentId,
        string         $transactionGroupId,
        PointThreshold $pointThreshold,
        int            $totalPointsUsed
    ): void
    {
        // Check if letter already exists
        $existingLetter = ViolationLetter::where('student_enrollment_id', $studentEnrollmentId)
            ->where('point_transaction_group_id', $transactionGroupId)
            ->where('point_threshold_id', $pointThreshold->id)
            ->first(); // Use first() to check existence

        // Only create letter if it doesn't exist
        if (!$existingLetter) {
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