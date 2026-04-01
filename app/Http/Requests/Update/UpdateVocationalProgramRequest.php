<?php

namespace App\Http\Requests\Update;

use App\Enums\Permission;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateVocationalProgramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Permission::VOCATIONAL_PROGRAMS_UPDATE->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $vocationalProgram = $this->route('vocationalProgram');

        return [
            'name' => ['required', 'string', Rule::unique('vocational_programs', 'name')->ignore($vocationalProgram)],
            'abbreviation' => ['sometimes', 'nullable', 'string']
        ];
    }
}
