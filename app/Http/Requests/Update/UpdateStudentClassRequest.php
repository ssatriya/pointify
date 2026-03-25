<?php

namespace App\Http\Requests\Update;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentClassRequest extends FormRequest
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
}
