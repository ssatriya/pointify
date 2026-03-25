<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GetListRequestParams extends FormRequest
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
            'per_page' => ['sometimes', 'integer', 'min:10', 'max:50'],
            'page' => ['sometimes', 'integer', 'min:1'],
            'sort_by' => ['sometimes', 'string'],
            'sort_direction' => ['sometimes', 'string', 'in:asc,desc'],
            'status' => ['sometimes', 'nullable', 'string'],
            'search' => ['sometimes', 'nullable', 'string'],
        ];
    }

    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);

        $validated['per_page'] = (int)($validated['per_page'] ?? 10);
        $validated['page'] = (int)($validated['page'] ?? 1);
        $validated['sort_by'] ??= 'created_at';
        $validated['sort_direction'] ??= 'asc';
        $validated['search'] ??= '';

        if (isset($validated['status']) && $validated['status'] !== '') {
            $validated['status'] = explode(',', $validated['status']);
        } else {
            unset($validated['status']);
        }

        return $validated;
    }
}
