<?php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Cell\DataValidation;
use App\Models\VocationalProgram;

class StudentTemplateExport implements WithHeadings, WithTitle, WithStyles, WithColumnWidths, WithEvents
{
    public function title(): string
    {
        return 'Template Impor Siswa';
    }

    public function headings(): array
    {
        return [
            'Nama Lengkap',
            'NIS / NISN',
            'Kejuruan',
            'Catatan: Kolom "Kejuruan" harus sesuai dengan nama yang terdaftar di sistem. Gunakan pilihan dropdown yang tersedia.',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 30,
            'B' => 20,
            'C' => 30,
            'D' => 80,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                
                // Fetch vocational programs names
                $programs = VocationalProgram::pluck('name')->toArray();
                
                if (empty($programs)) {
                    return;
                }

                // Create a comma-separated list for the dropdown
                // Excel has a limit of 255 characters for this formula
                $options = '"' . implode(',', $programs) . '"';
                
                // Apply validation for column C (rows 2 to 501)
                $validation = $sheet->getDataValidation("C2:C501");
                $validation->setType(DataValidation::TYPE_LIST);
                $validation->setErrorStyle(DataValidation::STYLE_STOP);
                $validation->setAllowBlank(false);
                $validation->setShowInputMessage(true);
                $validation->setShowErrorMessage(true);
                $validation->setShowDropDown(true);
                $validation->setErrorTitle('Input tidak valid');
                $validation->setError('Mohon pilih kejuruan dari daftar yang tersedia.');
                $validation->setPromptTitle('Pilih Kejuruan');
                $validation->setPrompt('Silakan pilih salah satu kejuruan dari daftar.');
                $validation->setFormula1($options);
            },
        ];
    }
}
