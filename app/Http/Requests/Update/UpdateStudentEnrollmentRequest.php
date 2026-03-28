<?php

namespace App\Http\Requests\Update;

use App\Enums\Permission;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentEnrollmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::UPDATE_STUDENT_ENROLLMENTS->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $studentEnrollment = $this->route('studentEnrollment');

        return [
            'student_id' => [
                'required',
                'string',
                'exists:students,id',
                Rule::unique('student_enrollments', 'student_id')
                    ->where('academic_year_id', $this->academic_year_id)
                    ->ignore($studentEnrollment),
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
