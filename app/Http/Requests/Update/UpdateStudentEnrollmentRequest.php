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
        return $this->user()->can(Permission::STUDENT_ENROLLMENTS_UPDATE->value);
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

    /**
     * Get the validation messages for the defined rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'exists' => ':attribute tidak valid.',
            'unique' => ':attribute sudah terdaftar untuk tahun akademik ini.',
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
            'student_id' => 'Siswa',
            'academic_year_id' => 'Tahun akademik',
            'is_repeating' => 'Status mengulang',
            'is_active' => 'Status aktif/nonaktif',
        ];
    }
}
