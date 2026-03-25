<?php

namespace App\Http\Requests\Store;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreViolationRequest extends FormRequest
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
            'notes' => [
                'required',
                'string',
            ],
            'student_signature' => [
                'required',
                'string',
            ],
        ];
    }
}
