<?php

namespace App\Http\Requests\Update;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePointThresholdRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $pointThreshold = $this->route('point_threshold');

        return [
            'academic_year_id' => [
                'required',
                'string',
                'exists:academic_years,id',
            ],
            'cumulative_points_threshold' => [
                'required',
                'integer',
                Rule::unique('point_thresholds')
                    ->ignore($pointThreshold)
                    ->where('academic_year_id', $this->academic_year_id),
            ],
            'description' => ['sometimes'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
