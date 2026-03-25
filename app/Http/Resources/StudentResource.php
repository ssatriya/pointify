<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            'student_number' => $this->student_number,
            'vocational_program' => [
                'value' => $this->vocationalProgram->id,
                'label' => $this->vocationalProgram->name,
            ],
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
        ];
    }
}
