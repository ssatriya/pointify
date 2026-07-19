<?php

namespace App\Http\Resources;

use App\Models\PointTransaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PointTransactionGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $violationIds = $this->violations->pluck('id');
        $rewardIds = $this->rewards->pluck('id');

        $transactions = PointTransaction::with([
            'violation.violationType',
            'violation.createdBy',
            'reward.rewardType',
            'reward.createdBy',
        ])
            ->where(function ($q) use ($violationIds, $rewardIds) {
                $hasViolations = $violationIds->isNotEmpty();
                $hasRewards = $rewardIds->isNotEmpty();

                if ($hasViolations) {
                    $q->whereIn('violation_id', $violationIds);
                }

                if ($hasRewards) {
                    $q->{$hasViolations ? 'orWhereIn' : 'whereIn'}('reward_id', $rewardIds);
                }
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return [
            'id' => $this->id,
            'sequence' => $this->sequence,
            'is_closed' => $this->is_closed,
            'has_letter' => $this->has_letter ?? false,
            'transactions' => PointTransactionResource::collection($transactions),
        ];
    }
}
