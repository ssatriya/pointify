<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentEnrollmentResource extends JsonResource
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
            'student' => [
                'id' => $this->student->id,
                'name' => $this->student->name,
            ],
            'academic_year' => [
                'id' => $this->academicYear->id,
                'name' => $this->academicYear->name,
            ],
            'is_repeating' => $this->is_repeating,
            'is_active' => $this->is_active,
            'current_points' => $this->current_points,
            'total_violations_points' => $this->total_violations_points,
            'total_rewards_points' => $this->total_rewards_points,
            'reset_count' => $this->reset_count,
            'created_at' => $this->created_at,
        ];
    }
}
