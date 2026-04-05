<?php

namespace App\Http\Requests\Update;

use App\Enums\Permission;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentClassRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::STUDENT_CLASSES_UPDATE);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'grade_level' => [
                'required',
                'string',
                'regex:/^10$|^11$|^12$/',
            ],
            'section' => [
                'sometimes',
                'nullable',
                'regex:/^[A-Z]?$/',
            ],
            'vocational_program_id' => [
                'required',
                'string',
                'exists:vocational_programs,id',
            ],
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
            'string' => ':attribute harus berupa teks.',
            'exists' => ':attribute tidak valid.',
            'regex' => 'Format :attribute tidak valid.',
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
            'grade_level' => 'Tingkat kelas',
            'vocational_program_id' => 'Kejuruan',
            'section' => 'Kelas/Rombel',
        ];
    }
}
