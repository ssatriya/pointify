<?php

declare(strict_types=1);

namespace App\Actions\Reward;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointTransactionGroup;
use App\Models\Reward;
use App\Models\RewardType;
use App\Models\StudentEnrollment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class CreateReward
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, StudentEnrollment $studentEnrollment)
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
