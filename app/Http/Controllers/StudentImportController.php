<?php

namespace App\Http\Controllers;

use App\Actions\Student\ImportStudent;
use App\Exports\StudentTemplateExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;
use Throwable;

class StudentImportController extends Controller
{
    /**
     * @throws Throwable
     */
    public function import(Request $request, ImportStudent $action)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls,csv', 'max:2048'],
        ]);

        try {
            $action->handle($request->file('file'));

            return Inertia::flash(['message' => 'Data siswa berhasil diimpor.'])->back();
        } catch (ValidationException $e) {
            return back()->withErrors($e->failures());
        } catch (Throwable $e) {
            return Inertia::flash(['error' => 'Gagal mengimpor data: '.$e->getMessage()])->back();
        }
    }

    public function downloadTemplate()
    {
        return Excel::download(new StudentTemplateExport, 'template-impor-siswa.xlsx');
    }
}
