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

    public function collection(Collection $rows)
    {
        $userId = Auth::id();
        
        foreach ($rows as $row) {
            $kejuruanName = trim($row['kejuruan'] ?? '');
            
            // Case-insensitive mapping for vocational programs by name
            $programId = $this->vocationalPrograms->filter(function ($id, $name) use ($kejuruanName) {
                return strtolower((string) $name) === strtolower((string) $kejuruanName);
            })->first();

            if (!$programId) {
                continue;
            }

            Student::create([
                'name' => trim($row['nama_lengkap'] ?? ''),
                'student_number' => trim((string)($row['nis_nisn'] ?? '')) ?: null,
                'vocational_program_id' => $programId,
                'created_by' => $userId,
                'is_active' => true,
            ]);
        }
    }

    public function prepareForValidation($data, $index)
    {
        $data['nis_nisn'] = isset($data['nis_nisn']) ? (string) $data['nis_nisn'] : null;

        return $data;
    }

    public function rules(): array
    {
        return [
            'nama_lengkap' => ['required', 'string', 'max:100'],
            'nis_nisn' => [
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
            'nama_lengkap.required' => 'Nama lengkap wajib diisi.',
            'kejuruan.required' => 'Kejuruan wajib diisi.',
            'nis_nisn.unique' => 'NIS/NISN :input sudah terdaftar.',
        ];
    }
}
