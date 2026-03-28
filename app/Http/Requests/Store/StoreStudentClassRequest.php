<?php

namespace App\Http\Requests\Store;

use App\Enums\Permission;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentClassRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::CREATE_STUDENT_CLASSES->value);
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
                'regex:/^(10|11|12)$/',
            ],
            'vocational_program_id' => [
                'required',
                'string',
                'exists:vocational_programs,id',
            ],
            'section' => [
                'sometimes',
                'nullable',
                'regex:/^[A-Z]?$/',
            ],
        ];
    }
}
