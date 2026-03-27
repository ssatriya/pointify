<?php

namespace App\Http\Requests\Update;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateViolationTypeRequest extends FormRequest
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
        $violationType = $this->route('violationType');

        return [
            'code' => [
                'required',
                'string',
                'max:5',
                'min:3',
                'uppercase',
                'alpha_num',
                Rule::unique('violation_types', 'code')->ignore($violationType),
            ],
            'description' => ['sometimes', 'string'],
            'points' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
