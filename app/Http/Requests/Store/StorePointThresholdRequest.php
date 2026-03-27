<?php

namespace App\Http\Requests\Store;

use App\Models\PointThreshold;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePointThresholdRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
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
                    ->where('academic_year_id', $this->academic_year_id),
                function ($attribute, $value, $fail) {
                    if ($this->academic_year_id) {
                        $maxThreshold = PointThreshold::where('academic_year_id', $this->academic_year_id)
                            ->max('cumulative_points_threshold');

                        if ($maxThreshold && $value <= $maxThreshold) {
                            $fail("Ambang poin harus lebih besar dari ambang poin tertinggi saat ini ($maxThreshold) untuk tahun akademik ini.");
                        }
                    }
                },
            ],
            'description' => ['sometimes'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
