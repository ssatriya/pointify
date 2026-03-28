<?php

namespace App\Http\Requests\Store;

use App\Enums\Permission;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRewardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::CREATE_REWARDS->value);
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
            'reward_type_id' => [
                'required',
                'string',
                'exists:reward_types,id',
            ],
            'notes' => [
                'required',
                'string',
            ],
        ];
    }
}
