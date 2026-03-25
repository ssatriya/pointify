<?php

namespace App\Http\Requests\Update;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRewardTypeRequest extends FormRequest
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
        $rewardType = $this->route('reward_type');

        return [
            'code' => [
                'required',
                'string',
                'max:5',
                'min:3',
                'uppercase',
                'alpha_num',
                Rule::unique('reward_types', 'code')
                    ->ignore($rewardType),
            ],
            'description' => ['sometimes', 'string'],
            'points' => ['required', 'integer'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
