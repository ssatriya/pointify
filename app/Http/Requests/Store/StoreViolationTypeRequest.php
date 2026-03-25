<?php

namespace App\Http\Requests\Store;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreViolationTypeRequest extends FormRequest
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
            'code' => [
                'required',
                'string',
                'max:5',
                'min:3',
                'uppercase',
                'alpha_num',
                'unique:violation_types,code',
            ],
            'description' => ['required', 'string'],
            'points' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
