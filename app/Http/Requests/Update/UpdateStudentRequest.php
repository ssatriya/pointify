<?php

namespace App\Http\Requests\Update;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
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
        $student = $this->route('student');

        return [
            'student_number' => [
                'required',
                'string',
                Rule::unique('students', 'student_number')->ignore($student),
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
}
