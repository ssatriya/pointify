<?php

namespace App\Http\Requests\Store;

use App\Http\Requests\UniqueStudentEnrollment;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentEnrollmentRequest extends FormRequest
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
        return [
            'student_id' => ['required', 'array', 'min:1'],
            'student_id.*' => [
                'required',
                'string',
                'exists:students,id',
                new UniqueStudentEnrollment,
            ],
            'academic_year_id' => [
                'required',
                'string',
                'exists:academic_years,id',
            ],
            'is_repeating' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
