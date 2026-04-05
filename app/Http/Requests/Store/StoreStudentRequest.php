<?php

namespace App\Http\Requests\Store;

use App\Enums\Permission;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::STUDENTS_CREATE->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_number' => [
                'nullable',
                'unique:students,student_number',
            ],
            'name' => ['required', 'string'],
            'vocational_program_id' => [
                'required',
                'string',
                'exists:vocational_programs,id',
            ],
            'is_active' => ['sometimes', 'boolean'],
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
            'student_number' => 'NIS/NISN',
            'name' => 'Nama',
            'vocational_program_id' => 'Kejuruan',
            'is_active' => 'Status aktif/nonaktif',
        ];
    }
}
