<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PointTransactionGroupResource;

class StudentEnrollmentSummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $currentPoints = $this->current_points ?? 0;

        return [
            'id' => $this->id,
            'name' => $this->student->name,
            'student_number' => $this->student->student_number,
            'academic_year' => $this->academicYear->name,
            'student_class' => $this->studentClass->name,
            'student_class_slug' => $this->studentClass->slug,
            'initial_points' => $this->initial_points,
            'remaining_points' => $currentPoints,
            'total_violations_points' => $this->total_violations_points,
            'total_rewards_points' => $this->total_rewards_points,
            'is_active' => $this->is_active,
            'is_repeating' => $this->is_repeating,
            'point_transaction_groups' => PointTransactionGroupResource::collection($this->whenLoaded('pointTransactionGroups')),
        ];
    }
}
