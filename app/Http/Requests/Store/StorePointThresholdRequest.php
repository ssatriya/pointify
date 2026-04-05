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

    /**
     * Get the validation messages for the defined rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'integer' => ':attribute harus berupa angka.',
            'exists' => ':attribute tidak valid.',
            'unique' => ':attribute sudah terdaftar.',
            'boolean' => ':attribute harus berupa status aktif/nonaktif.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'academic_year_id' => 'Tahun akademik',
            'cumulative_points_threshold' => 'Ambang poin kumulatif',
            'description' => 'Deskripsi',
            'is_active' => 'Status aktif/nonaktif',
        ];
    }
}
