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
            $result = $action->handle($request->file('file'));

            if ($result['skipped'] > 0) {
                $message = implode(' ', array_slice($result['skipped_reasons'], 0, 3));

                if (count($result['skipped_reasons']) > 3) {
                    $message .= ' Dan '.(count($result['skipped_reasons']) - 3).' lainnya.';
                }

                return Inertia::flash(['error' => $message])->back();
            }

            return Inertia::flash(['message' => "Berhasil mengimpor {$result['imported']} siswa."])->back();
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
