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
        return [
            'id' => $this->violation?->id ?? $this->reward?->id,
            'student_name' => $this->studentEnrollment->student->name,
            'type' => $this->transaction_type,
            'code' => $this->violation?->violationType->code ?? $this->reward?->rewardType->code,
            'created_by' => $this->violation?->createdBy->name ?? $this->reward?->createdBy->name,
            'notes' => $this->violation?->notes ?? $this->reward?->notes,
            'approval_status' => $this->violation?->approval_status ?? $this->reward?->approval_status,
            'points_change' => $this->points_change,
            'intended_points' => $this->intended_points,
            'points_after' => $this->points_after ?? null,
            'created_at' => $this->violation?->created_at ?? $this->reward?->created_at,
        ];
    }
}
