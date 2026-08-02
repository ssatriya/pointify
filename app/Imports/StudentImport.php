<?php

namespace App\Imports;

use App\Models\Student;
use App\Models\VocationalProgram;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class StudentImport implements SkipsEmptyRows, ToCollection, WithHeadingRow, WithValidation
{
    protected Collection $vocationalPrograms;

    protected array $seenStudentNumbers = [];

    public int $importedCount = 0;

    public int $skippedCount = 0;

    /** @var list<string> */
    public array $skippedReasons = [];

    public function __construct()
    {
        $this->vocationalPrograms = VocationalProgram::pluck('id', 'name');
    }

    protected function normalizeRow(Collection|array $row): array
    {
        $normalized = [];
        foreach ($row as $key => $value) {
            $cleanKey = preg_replace('/[^a-z0-9]/', '', strtolower((string) $key));
            $normalized[$cleanKey] = $value;
        }

        return $normalized;
    }

    public function collection(Collection $rows): void
    {
        $userId = Auth::id();

        foreach ($rows as $row) {
            $data = $this->normalizeRow($row);

            $namaLengkap = trim($data['namalengkap'] ?? '');
            $nisn = trim((string) ($data['nisnisn'] ?? '')) ?: null;
            $kejuruanName = trim($data['kejuruan'] ?? '');

            if ($namaLengkap === '' || $kejuruanName === '') {
                continue;
            }

            $programId = $this->vocationalPrograms->first(function ($id, $name) use ($kejuruanName) {
                return strtolower(trim((string) $name)) === strtolower(trim($kejuruanName));
            });

            if ($programId === null) {
                $this->skippedCount++;
                $this->skippedReasons[] = "Kejuruan '{$kejuruanName}' tidak ditemukan untuk {$namaLengkap}.";

                continue;
            }

            if ($nisn !== null) {
                if (in_array($nisn, $this->seenStudentNumbers, true)) {
                    $this->skippedCount++;
                    $this->skippedReasons[] = "NIS/NISN {$nisn} duplikat dalam file (untuk {$namaLengkap}).";

                    continue;
                }
                $this->seenStudentNumbers[] = $nisn;
            }

            if ($nisn !== null) {
                $student = Student::where('student_number', $nisn)->first();

                if ($student !== null) {
                    $this->skippedCount++;
                    $this->skippedReasons[] = "NIS/NISN {$nisn} sudah terdaftar atas nama {$student->name}.";

                    continue;
                }
            }

            Student::create([
                'name' => $namaLengkap,
                'student_number' => $nisn,
                'vocational_program_id' => $programId,
                'created_by' => $userId,
                'is_active' => true,
            ]);

            $this->importedCount++;
        }
    }

    public function prepareForValidation($data, $index)
    {
        $normalized = $this->normalizeRow($data);

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
            ],
            'kejuruan' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $exists = $this->vocationalPrograms->keys()->contains(function ($name) use ($value) {
                        return strtolower((string) $name) === strtolower((string) $value);
                    });

                    if (! $exists) {
                        $fail("Kejuruan '{$value}' tidak terdaftar di sistem.");
                    }
                },
            ],
        ];
    }

    public function customValidationMessages()
    {
        return [
            'nama-lengkap.required' => 'Nama lengkap wajib diisi.',
            'kejuruan.required' => 'Kejuruan wajib diisi.',
        ];
    }
}
