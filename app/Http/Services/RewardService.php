<?php

namespace App\Http\Services;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\Reward;
use App\Models\RewardType;
use App\Models\StudentEnrollment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class RewardService
{
    /**
     * @throws Throwable
     */
    public function revokeReward(Reward $reward, array $data)
    {
        return DB::transaction(function () use ($reward, $data) {
            $originalTransaction = PointTransaction::where('reward_id', $reward->id)
                ->where('transaction_type', 'reward')
                ->firstOrFail();

            $PointsAdded = $originalTransaction->points_change;
            $studentEnrollmentId = $reward->student_enrollment_id;

            $currentPoints = $reward->studentEnrollment->current_points;

            PointTransaction::create([
                'student_enrollment_id' => $studentEnrollmentId,
                'reward_id' => $reward->id,
                'transaction_type' => TransactionType::REVOKED->value,
                'processed_by' => Auth::id(),
                'description' => "Reversal of incorrect reward: $reward->id",
                'points_change' => $PointsAdded,
                'intended_points' => $currentPoints + $PointsAdded,
                'points_before' => $currentPoints,
                'points_after' => $currentPoints + $PointsAdded,
            ]);

            $reward->update([
                'approval_status' => ApprovalStatus::REVOKED->value,
                'revoked_by' => Auth::id(),
                'revoked_at' => now(),
                'revoked_reason' => $data['revoke_reason'],
            ]);
        });
    }

    /**
     * @throws Throwable
     */
    public function create(array $data, StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($data, $studentEnrollment) {
            $rewardType = RewardType::findOrFail($data['reward_type_id']);

            $currentPoints = $studentEnrollment->current_points;
            $rewardPoints = $rewardType->points;
            $newPoints = $currentPoints + $rewardPoints;

            $lastSequence = PointTransactionGroup::where('student_enrollment_id', $studentEnrollment->id)->max('sequence') ?? 0;

            $transactionGroup = PointTransactionGroup::firstOrCreate(
                [
                    'student_enrollment_id' => $studentEnrollment->id,
                    'is_closed' => false,
                ],
                [
                    'sequence' => $lastSequence + 1,
                ]
            );

            $reward = Reward::create([
                'point_transaction_group_id' => $transactionGroup->id,
                'student_enrollment_id' => $studentEnrollment->id,
                'reward_type_id' => $rewardType->id,
                'created_by' => Auth::id(),
                'notes' => $data['notes'] ?? null,
                'approval_status' => ApprovalStatus::APPROVED->value,
                'approved_by' => Auth::id(),
                'approved_at' => now(),
            ]);

            $reward->pointTransaction()->create([
                'student_enrollment_id' => $studentEnrollment->id,
                'transaction_type' => TransactionType::REWARD->value,
                'processed_by' => Auth::id(),
                'points_change' => $rewardPoints,
                'intended_points' => $rewardPoints,
                'points_before' => $currentPoints,
                'points_after' => $newPoints,
            ]);

            return $reward->load([
                'rewardType',
                'pointTransaction',
            ]);
        });
    }
}