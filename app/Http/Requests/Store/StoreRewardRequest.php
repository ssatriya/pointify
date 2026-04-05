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
        return $this->user()->can(Permission::REWARDS_CREATE->value);
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

    /**
     * Get the validation messages for the defined rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'exists' => ':attribute tidak valid.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'student_enrollment_id' => 'Pendaftaran siswa',
            'reward_type_id' => 'Jenis penghargaan',
            'notes' => 'Catatan',
        ];
    }
}
