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
        return $this->user()->can(Permission::CREATE_STUDENTS->value);
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
}
