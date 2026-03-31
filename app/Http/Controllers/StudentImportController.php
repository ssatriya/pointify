<?php

namespace App\Http\Controllers;

use App\Exports\StudentTemplateExport;
use App\Http\Services\StudentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class StudentImportController extends Controller
{
    public function __construct(
        protected StudentService $studentService
    ) {
    }

    /**
     * @throws Throwable
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls,csv', 'max:2048'],
        ]);

        $this->studentService->import($request->file('file'));

        return Inertia::flash(['message' => 'Data siswa berhasil diimpor.'])->back();
    }

    public function downloadTemplate()
    {
        return Excel::download(new StudentTemplateExport, 'template-impor-siswa.xlsx');
    }
}
