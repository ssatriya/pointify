<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcademicYearResource extends JsonResource
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
            'start_date' => $this->start_date->format('d/m/Y'),
            'start_date_raw' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('d/m/Y'),
            'end_date_raw' => $this->end_date->format('Y-m-d'),
            'is_active' => $this->is_active,
            'created_at' => $this->created_at->format('d/m/Y'),
        ];
    }
}
