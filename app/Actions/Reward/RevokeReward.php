<?php

declare(strict_types=1);

namespace App\Actions\Reward;

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\PointTransaction;
use App\Models\Reward;
use App\Models\StudentEnrollment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class RevokeReward
{
    /**
     * @throws Throwable
     */
    public function handle(Reward $reward, array $data)
    {
        DB::transaction(function () use ($reward, $data) {
            $reward = Reward::lockForUpdate()->find($reward->id);
            $studentEnrollment = StudentEnrollment::lockForUpdate()->find($reward->student_enrollment_id);
            $studentEnrollment->load('pointTransactions');

            $originalTransaction = PointTransaction::where('reward_id', $reward->id)
                ->where('transaction_type', 'reward')
                ->firstOrFail();

            $pointsAdded = $originalTransaction->points_change;
            $currentPoints = $studentEnrollment->currentPoints;

            PointTransaction::create([
                'student_enrollment_id' => $studentEnrollment->id,
                'reward_id' => $reward->id,
                'transaction_type' => TransactionType::REVOKED->value,
                'processed_by' => Auth::id(),
                'description' => "Reversal of incorrect reward: $reward->id",
                'points_change' => -$pointsAdded,
                'intended_points' => $currentPoints - $pointsAdded,
                'points_before' => $currentPoints,
                'points_after' => $currentPoints - $pointsAdded,
            ]);

            $reward->update([
                'approval_status' => ApprovalStatus::REVOKED->value,
                'revoked_by' => Auth::id(),
                'revoked_at' => now(),
                'revoked_reason' => $data['revoke_reason'],
            ]);
        });
    }
}
