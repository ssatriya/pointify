<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'name' => $this->student->name,
            'student_number' => $this->student->student_number,
            'academic_year' => $this->academicYear->name,
            'student_class' => $this->studentClass->name,
            'initial_points' => $this->initial_points,
            'remaining_points' => $currentPoints,
            'total_violations_points' => $this->total_violations_points,
            'total_rewards_points' => $this->total_rewards_points,
            'is_active' => $this->is_active,
            'is_repeating' => $this->is_repeating,
        ];
    }
}
