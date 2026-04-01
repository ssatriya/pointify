<?php

namespace App\Http\Requests\Store;

use App\Enums\Permission;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStudentEnrollmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::STUDENT_ENROLLMENTS_CREATE->value);
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
                Rule::unique('student_enrollments', 'student_id')
                    ->where('academic_year_id', $this->academic_year_id),
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
