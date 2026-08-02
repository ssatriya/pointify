<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Imports\StudentImport;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

final class ImportStudent
{
    /**
     * @return array{imported: int, skipped: int, skipped_reasons: list<string>}
     *
     * @throws Throwable
     */
    public function handle(UploadedFile $file): array
    {
        $import = new StudentImport;

        Excel::import($import, $file);

        return [
            'imported' => $import->importedCount,
            'skipped' => $import->skippedCount,
            'skipped_reasons' => $import->skippedReasons,
        ];
    }
}
