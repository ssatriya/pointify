<?php

namespace App\Http\Controllers;

use App\Http\Services\StudentClassService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class ReorderStudentClassController extends Controller
{
    public function __construct(
        protected StudentClassService $studentClassService
    ) {
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     * @throws Throwable
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['required', 'string', 'exists:student_classes,id'],
        ]);

        $this->studentClassService->reorder($validated['ids']);

        return Inertia::flash(['message' => 'Urutan kelas berhasil diperbarui.'])->back();
    }
}
