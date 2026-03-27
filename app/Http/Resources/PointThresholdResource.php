<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PointThresholdResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cumulative_points_threshold' => $this->cumulative_points_threshold,
            'academic_year' => [
                'value' => $this->academicYear->id,
                'label' => $this->academicYear->name,
            ],
            'description' => $this->description ?? '',
            'is_active' => $this->is_active,
            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
        ];
    }
}
