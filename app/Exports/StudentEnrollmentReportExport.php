<?php

namespace App\Exports;

use App\Models\StudentEnrollment;
use Illuminate\Support\Enumerable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StudentEnrollmentReportExport implements FromCollection, WithColumnWidths, WithHeadings, WithMapping, WithStyles, WithTitle
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
            'Total Dikurangkan',
            'Jumlah Reset',
            'Poin Saat Ini',
        ];
    }

    public function map($enrollment): array
    {
        $resetCount = $enrollment->pointTransactions->where('transaction_type', 'reset')->count();
        $totalDeducted = $enrollment->initial_points - $enrollment->current_points;

        return [
            ++$this->row,
            $enrollment->student->name,
            $enrollment->initial_points,
            -$totalDeducted,
            $resetCount,
            $enrollment->current_points,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 8,
            'B' => 30,
            'C' => 12,
            'D' => 18,
            'E' => 14,
            'F' => 14,
        ];
    }
}
