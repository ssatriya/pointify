<?php

namespace App\Imports;

use App\Models\Student;
use App\Models\VocationalProgram;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Validation\Rule;

class StudentImport implements ToCollection, WithHeadingRow, SkipsEmptyRows, WithValidation
{
    protected $vocationalPrograms;

    public function __construct()
    {
        $this->vocationalPrograms = VocationalProgram::all()->pluck('id', 'name');
    }

    /**
     * Normalize keys to be alphanumeric only for robust matching
     */
    protected function normalizeRow($row): array
    {
        $normalized = [];
        foreach ($row as $key => $value) {
            $cleanKey = preg_replace('/[^a-z0-9]/', '', strtolower((string)$key));
            $normalized[$cleanKey] = $value;
        }
        return $normalized;
    }

    public function collection(Collection $rows)
    {
        $userId = Auth::id();
        
        foreach ($rows as $row) {
            $data = $this->normalizeRow($row);
            
            $namaLengkap = trim($data['namalengkap'] ?? '');
            $nisNisn = trim((string)($data['nisnisn'] ?? '')) ?: null;
            $kejuruanName = trim($data['kejuruan'] ?? '');
            
            if (empty($namaLengkap) || empty($kejuruanName)) {
                continue;
            }

            // Case-insensitive mapping for vocational programs by name
            $programId = $this->vocationalPrograms->filter(function ($id, $name) use ($kejuruanName) {
                return strtolower(trim((string) $name)) === strtolower(trim((string) $kejuruanName));
            })->first();

            if (!$programId) {
                continue;
            }

            Student::create([
                'name' => $namaLengkap,
                'student_number' => $nisNisn,
                'vocational_program_id' => $programId,
                'created_by' => $userId,
                'is_active' => true,
            ]);
        }
    }

    public function prepareForValidation($data, $index)
    {
        $normalized = $this->normalizeRow($data);
        
        // Re-map normalized data back to standard keys for validation rules
        return [
            'nama-lengkap' => $normalized['namalengkap'] ?? null,
            'nis-nisn' => isset($normalized['nisnisn']) ? (string) $normalized['nisnisn'] : null,
            'kejuruan' => $normalized['kejuruan'] ?? null,
        ];
    }

    public function rules(): array
    {
        return [
            'nama-lengkap' => ['required', 'string', 'max:100'],
            'nis-nisn' => [
                'nullable', 
                'string', 
                'max:20', 
                Rule::unique('students', 'student_number')
            ],
            'kejuruan' => [
                'required', 
                'string',
                function ($attribute, $value, $fail) {
                    $exists = $this->vocationalPrograms->keys()->contains(function ($name) use ($value) {
                        return strtolower((string) $name) === strtolower((string) $value);
                    });
                    
                    if (!$exists) {
                        $fail("Kejuruan '{$value}' tidak terdaftar di sistem.");
                    }
                }
            ],
        ];
    }

    public function customValidationMessages()
    {
        return [
            'nama-lengkap.required' => 'Nama lengkap wajib diisi.',
            'kejuruan.required' => 'Kejuruan wajib diisi.',
            'nis-nisn.unique' => 'NIS/NISN :input sudah terdaftar.',
        ];
    }
}
