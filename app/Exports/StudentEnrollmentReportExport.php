<?php

namespace App\Exports;

use App\Models\StudentEnrollment;
use Illuminate\Support\Enumerable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StudentEnrollmentReportExport implements FromCollection, WithColumnWidths, WithHeadings, WithMapping, WithStartRow, WithStyles, WithTitle
{
    private int $row = 0;

    public function __construct(
        private readonly string $studentClassId,
    ) {}

    public function collection(): Enumerable
    {
        return StudentEnrollment::query()
            ->with(['student:id,name', 'pointTransactions:id,student_enrollment_id,transaction_type,points_change'])
            ->where('student_class_id', $this->studentClassId)
            ->whereHas('academicYear', fn ($q) => $q->where('is_active', true))
            ->where('is_active', true)
            ->get();
    }

    public function title(): string
    {
        return 'Laporan Poin Siswa';
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Siswa',
            'Poin Awal',
            'Poin Pelanggaran',
            'Jumlah Reset',
            'Poin Prestasi',
            'Poin Saat Ini',
        ];
    }

    public function startRow(): int
    {
        return 2;
    }

    public function map($enrollment): array
    {
        $resetCount = $enrollment->pointTransactions->where('transaction_type', 'reset')->count();

        return [
            ++$this->row,
            $enrollment->student->name,
            $enrollment->initial_points,
            $enrollment->total_violations_points,
            $resetCount,
            $enrollment->total_rewards_points,
            $enrollment->current_points,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $styles = [
            1 => ['font' => ['bold' => true]],
        ];

        for ($i = 2; $i <= $this->row + 1; $i++) {
            if ($i % 2 === 0) {
                $styles[$i] = [
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'color' => ['rgb' => 'F2F2F2'],
                    ],
                ];
            }
        }

        return $styles;
    }

    public function columnWidths(): array
    {
        return [
            'A' => 8,
            'B' => 30,
            'C' => 12,
            'D' => 18,
            'E' => 14,
            'F' => 16,
            'G' => 14,
        ];
    }
}
