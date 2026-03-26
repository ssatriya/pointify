<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentClassResource extends JsonResource
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
            'name' => $this->name,
            'grade_level' => [
                'value' => $this->grade_level,
                'label' => $this->grade_level,
            ],
            'section' => [
                'value' => $this->section ?? '',
                'label' => $this->section ?? '',
            ],
            'vocational_program' => [
                'value' => $this->vocationalProgram->id,
                'label' => $this->vocationalProgram->name,
            ],
            'created_at' => $this->created_at->format('d/m/Y'),
        ];
    }
}
