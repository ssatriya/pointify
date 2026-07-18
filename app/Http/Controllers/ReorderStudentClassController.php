<?php

namespace App\Http\Controllers;

use App\Actions\StudentClass\ReorderStudentClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class ReorderStudentClassController extends Controller
{
    /**
     * @throws Throwable
     */
    public function __invoke(Request $request, ReorderStudentClass $action): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['required', 'string', 'exists:student_classes,id'],
        ]);

        $action->handle($validated['ids']);

        return Inertia::flash(['message' => 'Urutan kelas berhasil diperbarui.'])->back();
    }
}
