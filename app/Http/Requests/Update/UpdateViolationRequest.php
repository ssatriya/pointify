<?php

namespace App\Http\Requests\Update;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateViolationRequest extends FormRequest
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
            'student_enrollment_id' => [
                'required',
                'string',
                'exists:student_enrollments,id',
            ],
            'violation_type_id' => [
                'required',
                'string',
                'exists:violation_types,id',
            ],
            'description' => [
                'required',
                'string',
            ],
        ];
    }
}
