<?php

namespace App\Http\Resources;

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
        $violations = $this->violations
            ->map(fn($violation) => $violation->pointTransaction)
            ->filter();

        $rewards = $this->rewards
            ->map(fn($reward) => $reward->pointTransaction)
            ->filter();

        $transactions = $violations
            ->merge($rewards)
            ->sortByDesc('created_at')
            ->values();

        return [
            'id' => $this->id,
            'sequence' => $this->sequence,
            'is_closed' => $this->is_closed,
            'has_letter' => $this->has_letter ?? false,
            'transactions' => PointTransactionResource::collection($transactions),
        ];
    }
}
