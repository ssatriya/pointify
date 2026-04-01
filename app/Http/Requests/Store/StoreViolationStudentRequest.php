<?php

namespace App\Http\Requests\Store;

use App\Enums\Permission;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreViolationStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::VIOLATIONS_CREATE->value);
        ;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'violation_type_id' => [
                'required',
                'string',
                'exists:violation_types,id',
            ],
            'notes' => [
                'required',
                'string',
            ],
        ];
    }
}
