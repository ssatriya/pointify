<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ViolationResource extends JsonResource
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
                'name' => $this->studentEnrollment->student->name,
                'class' => $this->studentEnrollment->studentClass->name,
                'abbreviation' => $this->studentEnrollment->studentClass->abbreviation,
            ],
            'violation' => [
                'name' => $this->violationType->name,
                'points' => $this->violationType->points,
            ],
            'notes' => $this->notes ?? '',
            'approval_status' => $this->approval_status,
            'created_by' => $this->createdBy->name,
            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
        ];
    }
}
