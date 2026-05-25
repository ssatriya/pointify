<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PointTransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $violation = $this->relationLoaded('violation') ? $this->violation : null;
        $reward = $this->relationLoaded('reward') ? $this->reward : null;

        return [
            'id' => $this->id,
            'violation_id' => $this->violation_id,
            'reward_id' => $this->reward_id,
            'type' => $this->transaction_type,
            'code' => $violation?->violationType?->code ?? $reward?->rewardType?->code,
            'created_by' => $violation?->createdBy?->name ?? $reward?->createdBy?->name,
            'notes' => $violation?->notes ?? $reward?->notes,
            'approval_status' => $violation?->approval_status ?? $reward?->approval_status,
            'points_change' => $this->points_change,
            'intended_points' => $this->intended_points,
            'points_after' => $this->points_after ?? null,
            'created_at' => $violation?->created_at ?? $reward?->created_at,
        ];
    }
}
