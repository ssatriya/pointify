<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Imports\StudentImport;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

final class ImportStudent
{
    /**
     * @throws Throwable
     */
    public function handle(UploadedFile $file): void
    {
        DB::transaction(function () use ($file) {
            Excel::import(new StudentImport, $file);
        });
    }
}
